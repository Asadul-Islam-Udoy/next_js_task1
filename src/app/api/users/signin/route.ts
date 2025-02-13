import {connect} from '@/app/dbConfig/dbConnection';
import {NextRequest,NextResponse} from 'next/server';
import bcypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '@/app/models/userModel';

connect()

export async function POST(request:NextRequest){
    try{
      const body = await request.json();
      const {email,password} = body;
      const user = await User.findOne({email}).select('+password');
      if(!user){
        return NextResponse.json({
            success:false,
            error:'user is not exists'
        },{status:400});
      }

      const match = await bcypt.compare(password,user.password);
      if(!match){
        return NextResponse.json({
            success:false,
            error:'user password is incurrect'
        },{status:400})
      }

     const token = await jwt.sign({id:user._id},process.env.JWT_SECRET!,{expiresIn:'1h'});
     const response =  NextResponse.json({
        sucess:true,
        message:'user login successfully!',
        user,
        token
     });
     response.cookies.set('token',token,{
        httpOnly:true,
        sameSite:'strict',
        maxAge:3600,
        path:"/"
     });
     return response;
    }
    catch(error){
      return NextResponse.json({
        success:false,
        error:error
      },{status:500})
    }
}