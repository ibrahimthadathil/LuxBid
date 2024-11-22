import Container, { Service } from "typedi";
import { productService } from "../../../service/implements/product/productService";
import { AuthRequest } from "../../../types/api";
import { Response } from "express";
import { Iuser } from "../../../models/userModel";

@Service()
export class productController {

    constructor(
        private product_Service :productService
    ){}
    async create_Post(req:AuthRequest,res:Response){
        try {
            const images=req.files as Express.Multer.File[]
           const {message,success}= await this.product_Service.createPost(req.user as Iuser,req.body,images) 
           if(success)res.status(200).json({success,message})
            else res.status(400).json({success,message})           
        } catch (error) {
            
        }
    }

    async get_Post(req:AuthRequest,res:Response){
        try {
            const user = req.user
            if(user){
               const {success,message,data}= await this.product_Service.getPost(user._id as string)
               console.log('====',data);
               
               if(success)res.status(200).json({success,data})
                else res.status(401).json({message})
            }else res.status(403).json({message:'Invalid access'})
        } catch (error) {
            res.status(500).json({message:'Sever Error , Try later'})
        }
    }
}

export const product_Controller = Container.get(productController)