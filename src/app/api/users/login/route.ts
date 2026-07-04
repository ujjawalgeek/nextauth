import connect from "@/dbConfig/dbCongif";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken";

connect();

export async function POST(request:NextRequest){
try{
  const reqBody =await request.json();
  const {email,password}=reqBody;

  if (!process.env.TOKEN_SECRET) {
    return NextResponse.json({ error: "TOKEN_SECRET is not configured" }, { status: 500 });
  }

  const user= await User.findOne({email});
  if(!user){
    return NextResponse.json({error:"User not found"},{status:404})
  }
  const isPasswordValid=await bcrypt.compare(password,user.password);
  if(!isPasswordValid){
    return NextResponse.json({error:"Invalid password"},{status:401})
  }

  const tokendata={
    id:user._id,
    email:user.email,
    username:user.username
  }

  const token=sign(tokendata,process.env.TOKEN_SECRET!,{expiresIn:"1d"})
  const response=NextResponse.json({message:"Login successful",token},{status:200})
  response.cookies.set("token",token,
    {
      httpOnly:true,
    }
  )
  return response;

}catch(err:any){
console.log('Error in login route:',err);
return NextResponse.json({ error: err?.message || "Login failed" }, { status: 500 });
}

}
