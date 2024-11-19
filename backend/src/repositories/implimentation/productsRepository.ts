import { Service } from "typedi";
import { Iproduct, Product } from "../../models/productModel";
import { BasRepository } from "./baseRepository";

@Service()
export class productRepository extends BasRepository<Iproduct>{

    constructor(){
        super(Product)
    }
}