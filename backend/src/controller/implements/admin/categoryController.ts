import Container, { Service } from "typedi";
import { categoryService } from "../../../service/implements/admin/category_Service";
import { Request, Response } from "express";
import { IcategoryController } from "../../interface/categoryController_Interface";
import { HttpStatus, responseMessage } from "@/enums/http_StatusCode";
import { logError } from "@/utils/logger_utils";

@Service()
export class categoryController implements IcategoryController{
  constructor(private cate_Service: categoryService) {}
  async add_Category(req: Request, res: Response) {
    try {
      const { name,isActive } = req.body;
      if (name) {
        const { message, success } = await this.cate_Service.add_Category(name,isActive);
        if (success) res.status(HttpStatus.CREATED).json({ success, message });
        else throw new Error(message);
      } else
        res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: responseMessage.INVALID_INPUT });
    } catch (error) {
      logError(error)
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: (error as Error).message, success: false });
    }
  }

  async get_Category(req: Request, res: Response) {
    try {      
      const { success, data, message } = await this.cate_Service.get_Category();
      if (success) res.status(HttpStatus.OK).json({ data, success });
      else res.status(HttpStatus.BAD_REQUEST).json({ success, message });
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: responseMessage.ERROR_MESSAGE });
    }
  }
  async get_ListedCategory(req: Request, res: Response) {
    try {      
      const { success, data, message } = await this.cate_Service.get_ListedCategory();
      if (success) res.status(HttpStatus.OK).json({ data, success });
      else res.status(HttpStatus.UNAUTHORIZED).json({ success, message });
    } catch (error) {
      logError(error)
      res.status(500).json({ message: "Internal error, Try later" });
    }
  }

  async remove_Category(req:Request,res:Response){
    const id = req.params.id    
    try {
     const {message,success}= await this.cate_Service.remove_Category(id)
     if(success)res.status(HttpStatus.OK).json({message,success})
      else res.status(HttpStatus.UNAUTHORIZED).json({message,success})
    } catch (error) {
      logError(error)
      res.status(500).json({message:responseMessage.ERROR_MESSAGE})
    }
  }

  async update_Category(req:Request,res:Response){
    const id = req.params.id
    try {
      if(id){
       const {success,message}= await this.cate_Service.category_Update(id)
        if(success) res.status(HttpStatus.OK).json({message,success})
          else res.status(HttpStatus.BAD_REQUEST).json({message,success})
      }else throw new Error('Match not found ')
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.ERROR_MESSAGE})
    }
  }
}

export const category_Controller = Container.get(categoryController);
