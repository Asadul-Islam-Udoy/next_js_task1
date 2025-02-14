import { GetTokenValidate } from "@/app/helpers/GetTokenValidate";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import {connect} from '@/app/dbConfig/dbConnection';

connect();

export async function GET(request:NextRequest) {
    try{
       const userId = await GetTokenValidate(request);
       const user = await User.findById(userId);
       if(!user){
        return NextResponse.json({
            success:false,
            error:'user is not found'
        },{status:400})
       }
     return NextResponse.json({ success: true, user });
    }
    catch(error){
        return NextResponse.json({
            success:false,
            error:error
        },{status:500})
    }
}