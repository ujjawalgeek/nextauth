import connect from "@/dbConfig/dbCongif";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request:NextRequest){
  try{
  const reqBody =await request.json();
  const {username,email,password}=reqBody;

  const user = await User.findOne({email});
  if(user){
    return NextResponse.json({error:"User already exists"},{status:400})
  }

  const hashedPassword=await bcrypt.hash(password,10);
   const newUser= new User({
    username,
    email,
    password:hashedPassword
   })

   const savedUser=await newUser.save();
   return NextResponse.json({message:"User created successfully",user:savedUser},{status:201}) 


  }catch(err:any){
return NextResponse.json({error:err.message},{status:500})
  }
}