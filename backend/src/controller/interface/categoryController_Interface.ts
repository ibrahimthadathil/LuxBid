import { Request, Response } from "express";

export interface IcategoryController{
    add_Category(req:Request,res:Response):Promise<void>;
    get_Category(req:Request,res:Response):Promise<void>;
    remove_Category(req:Request,res:Response):Promise<void>;
    update_Category(req:Request,res:Response):Promise<void>
}