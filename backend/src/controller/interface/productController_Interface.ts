
import { Request, Response } from "express";

export interface IproductController{
    create_Post(req:Request,res:Response):Promise<void>;
    get_Post(req:Request,res:Response):Promise<void>;
    findAllProducts(req:Request,res:Response):Promise<void>;
    removePost(req:Request,res:Response):Promise<void>;
    updatePostStatus(req:Request,res:Response):Promise<void>;
    rejectPost(req:Request,res:Response):Promise<void>;
}