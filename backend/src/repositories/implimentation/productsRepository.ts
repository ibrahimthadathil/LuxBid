import { Service } from "typedi";
import { Iproduct, Product } from "../../models/productModel";
import { BasRepository } from "./baseRepository";

@Service()
export class productRepository extends BasRepository<Iproduct>{

    constructor(){
        super(Product)
    }
    async findByUser(id:string){
        try {
            return await Product.find({seller:id})
        } catch (error) {
            throw new Error('errofrom fetching the products')
        }
    }
}