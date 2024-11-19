import Container, { Service } from "typedi";
import { categoryService } from "../../../service/implements/admin/category_Service";
import { Request, Response } from "express";

@Service()
export class cateController {
  constructor(private cate_Service: categoryService) {}
  async add_Category(req: Request, res: Response) {
    try {
      const { name } = req.body;
      if (name) {
        const { message, success } = await this.cate_Service.addCategory(name);
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
}

export const categoryController = Container.get(cateController);
