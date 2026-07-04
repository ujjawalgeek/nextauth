"use client"
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import {useRouter} from "next/navigation";

type ProfileUser = {
  _id: string;
  email: string;
  username: string;
};

export default function ProfilePage() {
const router = useRouter();
const [user, setUser] = useState<ProfileUser | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const getUser=async()=>{
  try {
    setLoading(true);
    setError("");
    const response = await axios.get("/api/users/me");
    setUser(response.data.data);
  } catch (err:any) {
    setError(err?.response?.data?.error || "Unable to load profile");
  } finally {
    setLoading(false);
  }
}
useEffect(()=>{
  getUser()
},[])


const logOut=async()=>{
try{
  await axios.post("/api/users/logout")
  toast.success("Logout successful")
  router.replace("/login")
}catch(err:any){
  console.log("logout error",err.message) 
}

}
  return (
     <div className='min-h-screen bg-gray-900 px-4 flex items-center justify-center'>
      <div className="w-full max-w-md rounded-2xl border border-gray-700 bg-gray-800 p-8 text-white shadow-xl">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Account Profile</p>
          <h1 className="mt-2 text-3xl font-semibold">Your details</h1>
        </div>

        {loading ? (
          <p className="text-gray-300">Loading profile...</p>
        ) : error ? (
          <p className="rounded-lg bg-red-500/10 px-4 py-3 text-red-300">{error}</p>
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl bg-gray-900/70 px-4 py-3">
              <p className="text-sm text-gray-400">Profile ID</p>
              <p className="mt-1 break-all text-lg font-medium text-amber-300">{user?._id}</p>
            </div>

            <div className="rounded-xl bg-gray-900/70 px-4 py-3">
              <p className="text-sm text-gray-400">Email</p>
              <p className="mt-1 text-lg font-medium text-white">{user?.email}</p>
            </div>

            <div className="rounded-xl bg-gray-900/70 px-4 py-3">
              <p className="text-sm text-gray-400">Username</p>
              <p className="mt-1 text-lg font-medium text-white">{user?.username}</p>
            </div>
          </div>
        )}

        <button className="mt-8 w-full rounded-lg bg-blue-500 px-4 py-3 font-medium text-white transition hover:bg-blue-600" onClick={logOut}>Logout</button>
      </div>
    </div>
  )
}