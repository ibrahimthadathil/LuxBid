import { Request, Response } from "express";

export interface IcategoryController{
    addCategory(req:Request,res:Response):Promise<void>;
    getCategory(req:Request,res:Response):Promise<void>;
    removeCategory(req:Request,res:Response):Promise<void>;
    updateCategory(req:Request,res:Response):Promise<void>
}