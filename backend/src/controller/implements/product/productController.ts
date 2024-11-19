import Container, { Service } from "typedi";
import { productService } from "../../../service/implements/product/productService";
import { AuthRequest } from "../../../types/api";
import { Response } from "express";

@Service()
export class productController {

    constructor(
        private product_Service :productService
    ){}
    async create_Post(req:AuthRequest,res:Response){
        try {
            console.log('====',req.body,req.files);
            
        } catch (error) {
            
        }
    }
}

export const product_Controller = Container.get(productController)