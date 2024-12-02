
import { Request, Response } from "express";

export interface IproductController{
    create_Post(req:Request,res:Response):Promise<void>;
    get_Post(req:Request,res:Response):Promise<void>;
    findAll_Products(req:Request,res:Response):Promise<void>;
    remove_Post(req:Request,res:Response):Promise<void>;
    update_PostStatus(req:Request,res:Response):Promise<void>;
    reject_Post(req:Request,res:Response):Promise<void>;
}