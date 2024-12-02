import Container, { Service } from "typedi";
import { productService } from "../../../service/implements/product/productService";
import { AuthRequest } from "../../../types/api";
import { Request, Response } from "express";
import { Iuser } from "../../../models/userModel";
import { IproductController } from "../../interface/productController_Interface";

@Service()
export class productController implements IproductController{
  constructor(private product_Service: productService) {}
  async create_Post(req: AuthRequest, res: Response) {
    try {
      const images = req.files as Express.Multer.File[];
      const { message, success } = await this.product_Service.create_Post(
        req.user as Iuser,
        req.body,
        images
      );
      if (success) res.status(200).json({ success, message });
      else res.status(400).json({ success, message });
    } catch (error) {}
  }

  async get_Post(req: AuthRequest, res: Response) {
    try {
      const user = req.user;
      if (user) {
        const { success, message, data } = await this.product_Service.findUser_Post(
          user._id as string
        );
        console.log("====", data);

        if (success) res.status(200).json({ success, data });
        else res.status(401).json({ message });
      } else res.status(403).json({ message: "Invalid access" });
    } catch (error) {
      res.status(500).json({ message: "Sever Error , Try later" });
    }
  }

  async findAll_Products(req: Request, res: Response) {
    try {
      const status = req.params.status;
      const { success, data, message } =
        await this.product_Service.findAll_Products(status === "true");
      if (success) res.status(200).json({ success, data });
      else res.status(400).json({ success, message });
    } catch (error) {
      res.status(500).json({ message: "Sever Error , Try later" });
    }
  }
  async remove_Post(req:Request,res:Response){
    const id = req.params.id
    try {
      if(id){
       const {success,message}=await this.product_Service.remove_Post(id)
       if(success)res.status(200).json({message,success})
        else res.status(401).json({message,success})
      }else throw new Error('Failed to Match item')
    } catch (error) {
      res.status(500).json({ message: (error as Error).message + ", Sever Error , Try later" });
    }
  }
  async update_PostStatus(req:Request,res:Response){
    try {
      const id =req.params.id
      if(id){
        const{message,success}= await this.product_Service.update_PostStatus(id)
        if (success) res.status(200).json({ success, message });
         else res.status(400).json({ success, message });
      } else throw new Error('Match not found')
    } catch (error) {
      res.status(500).json({ message: "Sever Error , Try later" });
    }
  }
  async reject_Post(req:Request,res:Response){
    try {
      const id = req.params.id
      if(id){
       const{message,success}= await this.product_Service.reject_Post(id)
       if(success)res.status(200).json({success,message})
      }else throw new Error('Match not found')
    } catch (error) {
      res.status(500).json({ message: "Sever Error , Try later" });
    }
  }
  async update_Post(req:AuthRequest,res:Response){
    try {
      console.log('00000000000');
      
      console.log(req.files , req.body);
      
    } catch (error) {
      
    }
  }
}



export const product_Controller = Container.get(productController);
