import mongoose from "mongoose";

export default async  function connect() {
   try{
 mongoose.connect(process.env.MONGODB_URI!);
 const connection=mongoose.connection;
 connection.on('connected',()=>{
    console.log('MongoDB connected successfully');
 })
 connection.on('error',(err)=>{
    console.log('MongoDB connection error:',err);
    process.exit(1)
 })
   }catch(err){
console.log('MongoDB connection error:',err);
   }
  }
