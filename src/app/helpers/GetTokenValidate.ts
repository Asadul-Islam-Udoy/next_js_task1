
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export function GetTokenValidate(request:NextRequest) {
    try{
    const token = request.cookies.get('token')?.value || '';
    if(!token){
    return NextResponse.json({
        success:false,
        error:'token is not define!'
    },{status:400})
    }
    const decoded:any =  jwt.verify(token,process.env.JWT_SECRET!);
    return decoded?.id
}
    catch (error:any) {
        return NextResponse.json({
            success: false,
            error: error,
        }, { status: 401 });
    }
}