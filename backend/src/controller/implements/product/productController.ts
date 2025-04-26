import Container, { Service } from "typedi";
import { productService } from "../../../service/implements/product/productService";
import { AuthRequest } from "../../../types/api";
import { Request, Response } from "express";
import { IproductController } from "../../interface/productController_Interface";
import { logError } from "@/utils/logger_utils";
import { HttpStatus, responseMessage } from "@/enums/http_StatusCode";

@Service()
export class ProductController implements IproductController{
  constructor(private product_Service: productService) {}
  async create_Post(req: AuthRequest, res: Response) {
    try {
      const images = req.files as Express.Multer.File[];
      const { message, success } = await this.product_Service.create_Post(
        req.user as string,
        req.body,
        images
      );
      if (success) res.status(HttpStatus.CREATED).json({ success, message });
      else res.status(HttpStatus.BAD_REQUEST).json({ success, message });
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.ERROR_MESSAGE})
    }
  }
  async get_Post(req: AuthRequest, res: Response) {
    try {
      const userId = req.user;
      if (userId) {
        const { success, message, data } = await this.product_Service.findUser_Post(
          userId as string
        );
        
        if (success) res.status(HttpStatus.OK).json({ success, data });
        else res.status(HttpStatus.UNAUTHORIZED).json({ message });
      } else res.status(HttpStatus.FORBIDDEN).json({ message:responseMessage.ACCESS_DENIED});
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: responseMessage.ERROR_MESSAGE });
    }
  }
  async findAllProducts(req: Request, res: Response) {
    try {
      const status = req.params.status;
      const { success, data, message } =
      await this.product_Service.findAll_Products(status === "true");
      if (success) res.status(HttpStatus.OK).json({ success, data });
      else res.status(HttpStatus.UNAUTHORIZED).json({ success, message });
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: responseMessage.ERROR_MESSAGE });
    }
  }
  async remove_Post(req:Request,res:Response){
    const id = req.params.id
    try {
      if(id){
       const {success,message}=await this.product_Service.remove_Post(id)
       if(success)res.status(HttpStatus.OK).json({message,success})
        else res.status(HttpStatus.UNAUTHORIZED).json({message,success})
      }else throw new Error(responseMessage.NOT_FOUND)
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: (error as Error).message + responseMessage.ERROR_MESSAGE});
    }
  }
  async updatePostStatus(req:Request,res:Response){
    try {
      const id =req.params.id
      if(id){
        const{message,success}= await this.product_Service.update_PostStatus(id)
        if (success) res.status(HttpStatus.OK).json({ success, message });
         else res.status(HttpStatus.BAD_REQUEST).json({ success, message });
      } else throw new Error(responseMessage.NOT_FOUND)
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: responseMessage.ERROR_MESSAGE });
    }
  }
  async rejectPost(req:Request,res:Response){
    try {
      const id = req.params.id
      if(id){
       const{message,success}= await this.product_Service.reject_Post(id)
       if(success)res.status(HttpStatus.OK).json({success,message})
      }else throw new Error(responseMessage.NOT_FOUND)
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: responseMessage.ERROR_MESSAGE });
    }
  }
  async update_Post(req:AuthRequest,res:Response){
    try {
      const postId = req.params.id
      const newImage = req.files as Express.Multer.File[]
      const data = req.body
     const {message,success}= await this.product_Service.update_post(postId,data,newImage)
     if(success)res.status(HttpStatus.OK).json({message,success})
     else res.status(HttpStatus.UNAUTHORIZED).json({message,success})
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: responseMessage.ERROR_MESSAGE })
    }
  }
  async approved_Post(req:AuthRequest,res:Response){
    try {
      const userId = req.user
      if(!userId)res.status(HttpStatus.FORBIDDEN).json({message:responseMessage.INVALID_REQUEST})
      const {success,data,message}=await this.product_Service.approved_Post(userId as string)
      if(success)res.status(HttpStatus.OK).json({message,data})
      else res.status(HttpStatus.UNAUTHORIZED).json({message,success})  
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: responseMessage.ERROR_MESSAGE })
    }
  }
}



export const productController = Container.get(ProductController);
