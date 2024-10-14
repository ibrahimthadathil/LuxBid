import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/DB'

dotenv.config() 

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send('backend running')
})


const PORT = process.env.PORT_NO || 5001;

app.listen(PORT,()=>{
    console.log(`backend running at http://localhost:${PORT}`)
})









