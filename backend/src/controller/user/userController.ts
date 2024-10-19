import { Request, Response } from "express";
import { userService } from "../../service/userService";
import { Iuser } from "../../models/userModel";
import { Iopt } from "../../models/otpModel";


class UserController{

        async Signup( req:Request , res:Response ){

            try {
                
                const userData : Iuser = req.body
                const {message , token} = await userService.createUser(userData)
                if(!token) res.status(409).json({ sstatus: message })          
                else res.status(200).json({token:token , status :message})

            } catch (error) {

                console.log((error as Error).message);
                
            }
            }

    async verifyOTP(req:Request , res : Response){
        try {
            const {OTP}= req.body
            const token = req.headers.authorization as string 
            const response = await userService.verifyotp(OTP ,token) 
            if(!response)res.status(401).json({message : 'Invalid otp'})
            else res.status(200).json({token:response,message : 'otp verification success'})
        } catch (error) {
            console.log((error as Error).message);
            if((error as Error).message == 'Token verification failed'){
                res.status(401).json({ message: 'Invalid token' });
            }

        } 
    }  
    
    async register(req:Request , res:Response){
        try {
            const userDetails:Iuser = req.body
            const token = req.headers.authorization as string
           const response= await userService.registerUser(userDetails,token)
            if(response) res.status(200).json({token:response.token , message:response.message})
                else res.status(500).json({message:"couldn't save the user"})
        } catch (error) {
            console.log(error);
            
        }
    }

    async signIn(req:Request,res:Response){
        try {
           const {email,password} = req.body
          const response = await userService.verifySignIn(email,password)
        if(response?.success){
            res.status(200).json({token:response.token , status:response.status})
        }else{
        
            res.status(401).json({status:response?.status})
        }
        } catch (error) {
            res.status(500).json({status:(error as Error).message})
        }
    }
}

export const userController = new UserController()

