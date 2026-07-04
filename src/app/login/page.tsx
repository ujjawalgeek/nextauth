"use client";

import Link from "next/link";
import React from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router=useRouter();
  const [user,setUser]=React.useState({
     email:"",
     password:""
  })

const handleLogin=async()=>{
try{
const response=await axios.post("/api/users/login",user)
console.log("login response",response.data)
toast.success("Login successful")


router.push("/profile")

}catch(err:any){
 console.error(err);
  toast.error(err.response?.data?.error || "Login failed");
  
}
}


  return (
    <div className='flex *:flex-col items-center justify-center h-screen bg-gray-900'>
    <form className="flex flex-col gap-4 bg-gray-800 p-8 rounded-lg">
       <h1 className="text-center text-white">Login</h1>
      <label htmlFor="Email" >Email:</label>
     <input type="email" placeholder="Email" value={user.email} onChange={(e)=>{
      setUser({...user,email:e.target.value})
     }}  id="Email" /> 
      <label htmlFor="username" >Password:</label>
     <input type="password" placeholder="Password" value={user.password} onChange={(e)=>{
      setUser({...user,password:e.target.value})
     }}  id="Password" /> 

    <button type="button" onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Login</button>
      <p className="text-white">Don't have an account? <Link href="/signup" className="text-blue-500">Sign Up</Link></p>
     </form>
    </div>
  )
}