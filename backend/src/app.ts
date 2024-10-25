import 'reflect-metadata'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/DB'
import userRoute from './routes/user/userRoues'
import cors from 'cors'
import cookieParser from "cookie-parser";

dotenv.config() 
connectDB()

const target = {
    origin : process.env.server_URL, // 5001
    changeOrigin:true,
}

const app = express()
app.use(cors(target))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/Luxbid',userRoute)


const PORT = process.env.PORT_NO || 4001;

app.listen(PORT,()=>{
    console.log(`backend running at http://localhost:${PORT}`)
})









