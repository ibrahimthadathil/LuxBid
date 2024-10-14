import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const URL = process.env.MONGO_URL as string
const connectDB = async()=>{
    try {
        await mongoose.connect(URL)
        console.log('DB connected');
        
    } catch (error:any) {
        console.log(error.message)
    }
}
export default connectDB