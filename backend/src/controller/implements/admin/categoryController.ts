import Container, { Service } from "typedi";
import { categoryService } from "../../../service/implements/admin/category_Service";
import { Request, Response } from "express";

@Service()
export class cateController {
  constructor(private cate_Service: categoryService) {}
  async add_Category(req: Request, res: Response) {
    try {
      const { name,isActive } = req.body;
      if (name) {
        const { message, success } = await this.cate_Service.addCategory(name,isActive);
        if (success) res.status(200).json({ success, message });
        else throw new Error(message);
      } else
        res.status(401).json({ success: false, message: "Invalid credantial" });
    } catch (error) {
      res
        .status(401)
        .json({ message: (error as Error).message, success: false });
    }
  }

  async get_category(req: Request, res: Response) {
    try {
      const { success, data, message } = await this.cate_Service.getCategory();
      if (success) res.status(200).json({ data, success });
      else res.status(400).json({ success, message });
    } catch (error) {
      res.status(500).json({ message: "Internal error, Try later" });
    }
  }

  async Category_Remove(req:Request,res:Response){
    const id = req.params.id    
    try {
     const {message,success}= await this.cate_Service.removeCategory(id)
     if(success)res.status(200).json({message,success})
      else res.status(401).json({message,success})
    } catch (error) {
      res.status(500).json({message:'Internal error, Try later'})
    }
  }

  async category_update(req:Request,res:Response){
    const id = req.params.id
    try {
      if(id){
       const {success,message}= await this.cate_Service.categoryUpdate(id)
        if(success) res.status(200).json({message,success})
          else res.status(401).json({message,success})
      }else throw new Error('Match not found ')
    } catch (error) {
      res.status(500).json({message:'Internal Error,Try Later'})
    }
  }
}

export const categoryController = Container.get(cateController);
