import Container, { Service } from "typedi";
import { userService } from "../../../service/implements/user/userService";
import { IuserContrller } from "../../interface/controller_Interface";
import { Request, Response } from "express";
import { AuthRequest } from "../../../types/api";

@Service()
 class user_Controller implements IuserContrller{

    constructor(
        private userServide : userService

    ){}

    async findUser (req:AuthRequest , res:Response){
        try {
            const user = req.user
            if(user){
                res.status(200).json({ success:true , data :user})
            }else res.status(401).json({success:false , message:'un-Authorized'})
            
        } catch (error) {
            console.log('from error',(error as Error).message);
            res.status(500).json({message:'Internal Error'})
        }
    }

    async uploadProfile(req:AuthRequest,res:Response){
        try {
            const currentUser = req.user
            if(req.file && currentUser){
             const {message,success}= await this.userServide.upload_Profile(currentUser._id as string,req.file)  
             if(success)res.status(200).json({success,message})
             else res.status(401).json({success,message})   
            }else res.status(400).json({success:false,message:'Failed to upload, Try later'})
        } catch (error) {
            console.log('from upload ',error);
            res.status(500).json({success:false,message:'Internal error, Try later'})
        }
        
    }

    async editProfile(req:AuthRequest, res:Response){
        try {
            const user = req.user
            if(user){
               const { message , success }= await this.userServide.editProfile(req.body,user._id as string)
               if(success){
                res.status(200).json({success,message})
               }else res.status(400).json({message,success})
            }else res.status(200).json({success:false,message:'Inavlid Access'})
        } catch (error) {
            
        }
    }
}

export const userController = Container.get(user_Controller)

