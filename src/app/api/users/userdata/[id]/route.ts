import User from "@/app/models/userModel";
import {connect} from '@/app/dbConfig/dbConnection';
import { NextRequest, NextResponse } from "next/server";

await connect()
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
   
    if (id) {
      const user  = await User.findById(id);
      if(!user){
        return NextResponse.json({ success: false, error: "User is not found" }, { status: 400 }); 
      }

   return NextResponse.json({
        success:true,
        message:'user getting successfully!',
        user
      },{status:200})
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error,
      },
      { status: 500 }
    );
  }
}
