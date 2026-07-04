import {NextResponse,NextRequest} from "next/server";
import {getDataFromToken} from "@/helpers/getdataformtokens";
import connect from "@/dbConfig/dbCongif";
import User from "@/models/userModel";

connect();

export async function GET(request:NextRequest){
  try{
const userId=getDataFromToken(request);
  const user=await User.findById(userId).select("-password");
  if(!user){
    return NextResponse.json({error:"User not found"},{status:404})
  }
  return NextResponse.json({message:"User found",data:user})
  }catch(err:any){
    return NextResponse.json({error:err.message},{status:500})
  }
}