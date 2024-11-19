import { Service } from "typedi";
import { productRepository } from "../../../repositories/implimentation/productsRepository";

@Service()
export class productService{
    constructor(
        private productrepo :productRepository
    ){}
}