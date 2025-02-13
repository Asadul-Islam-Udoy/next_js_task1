
import mongoose from "mongoose";
export async function connect() {
    try{
      await mongoose.connect(process.env.MONGO_URL!)
      const connection = await mongoose.connection;
      if(!connection){
        console.log('mongodb errors')
      }
      connection.on('connected',()=>{
        console.log('MongoDb connection successfully!')
      })

      connection.on('error',(err)=>{
        console.log('MongoDB connection error'+err)
        process.exit();
      })
    }
    catch(error){
        console.log('Somthing is wrong');
        console.log(error);
        process.exit();
    }
}


