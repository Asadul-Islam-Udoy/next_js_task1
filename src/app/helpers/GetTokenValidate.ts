
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define the expected structure of the JWT payload
interface DecodedToken extends JwtPayload {
    id: string;
}
export function GetTokenValidate(request:NextRequest) {
    try{
    const token = request.cookies.get('token')?.value || '';
    if(!token){
    return NextResponse.json({
        success:false,
        error:'token is not define!'
    },{status:400})
    }
    const decoded =  jwt.verify(token,process.env.JWT_SECRET!) as DecodedToken;;
    return decoded?.id
}
    catch (error:any) {
        return NextResponse.json({
            success: false,
            error: error,
        }, { status: 401 });
    }
}