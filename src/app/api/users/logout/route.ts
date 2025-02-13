import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    try{
      const response = NextResponse.json({
        success:true,
        message:'logout successfully!'
      });
      response.cookies.set('token','',{
       httpOnly:true,
       sameSite:'strict',
       expires:new Date(0),
       path:'/'
      }) ;
      return response
    }
    catch(error){
      return NextResponse.json({
        success:false,
        error:error}
      ,{status:500})
    }
}