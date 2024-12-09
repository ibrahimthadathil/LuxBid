import { Service } from "typedi";
import { Iproduct, Product } from "../../../models/productModel";
import { BasRepository } from "../baseRepository";

@Service()
export class productRepository extends BasRepository<Iproduct>{

    constructor(){
        super(Product)
    }
    async findByUser(id:string){
        try {
            return await Product.find({seller:id}).populate('category',)
        } catch (error) {
            throw new Error('errofrom fetching the products')
        }
    }
    async findByStatus(status:boolean){
        try {
            return await Product.find({isApproved:status}).populate('seller','-password').populate('category')
        } catch (error) {
            throw new Error('failed to find  post')
        }
    }
    async findByApproved(id:string){
        try {
            return await Product.find({ seller:id , isApproved:true})
        } catch (error) {
            throw new Error('failed to findApproved post')
        }
    }
}