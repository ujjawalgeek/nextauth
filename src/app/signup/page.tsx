"use client";

import Link from "next/link";
import React from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router=useRouter();
  const [user,setUser]=React.useState({
     email:"",
     username:"",
     password:""
  })

const onSignUp=async()=>{
try {
  const response=await axios.post("/api/users/signup",user)
  console.log("signup response",response.data)
  router.push("/login")
} catch (error:any) {
  console.log("signup error",error.message)
}
}

  return (
    <div className='flex *:flex-col items-center justify-center h-screen bg-gray-900'>
    <form className="flex flex-col gap-4 bg-gray-800 p-8 rounded-lg">
       <h1 className="text-center text-white">Sign Up</h1>
     <label htmlFor="username" >Username:</label>
     <input type="text" placeholder="Username" value={user.username} onChange={(e)=>{
      setUser({...user,username:e.target.value})
     }}  id="username" /> 
      <label htmlFor="Email" >Email:</label>
     <input type="email" placeholder="Email" value={user.email} onChange={(e)=>{
      setUser({...user,email:e.target.value})
     }}  id="Email" /> 
      <label htmlFor="username" >Password:</label>
     <input type="password" placeholder="Password" value={user.password} onChange={(e)=>{
      setUser({...user,password:e.target.value})
     }}  id="Password" /> 

     <button type="button" onClick={onSignUp} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Sign Up</button>
     <p className="text-white">Already have an account? <Link href="/login" className="text-blue-500">Login</Link></p>
     </form>
    </div>
  )
}