import {NextResponse} from "next/server";

export async function POST(){
  try{
    const response=NextResponse.json({message:"Logout successful"},{status:200})
    response.cookies.set("token","",{
      httpOnly:true,
      expires:new Date(0),
      path:"/"
    })
    return response;
  }
  catch(err:any){
    return NextResponse.json({error:err.message},{status:500})
  } 
}