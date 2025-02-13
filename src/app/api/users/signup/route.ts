import {connect} from '@/app/dbConfig/dbConnection';
import {NextRequest,NextResponse} from 'next/server';
import User from '@/app/models/userModel';
import bcrypt from 'bcryptjs'

await connect();
export async function POST(request:NextRequest) {
    try{
    // const signature = request.headers.get('x-signature')
       const body = await request.json();
       const{name,email,password} = body;
       const user = await User.findOne({email});
       if(user){
        return NextResponse.json({
            success:false,
            error:'user already existing!',
        },{status:400})
       }
       const solt = await bcrypt.genSalt(10);
       const hassPasswrod = await bcrypt.hash(password,solt)
       const newUser = await new User({
        name,
        email,
        password: hassPasswrod
       });

       const userSave = await newUser.save();
       console.log('suresfsdf')
       return NextResponse.json({
        success:true,
        message:'user create successfullly!',
        user:userSave
       },{status:200})
    }
    catch(error:any){
      return NextResponse.json({
        success:false,
        error:error.message
      },{status:500})
    }
}