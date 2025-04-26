import { Service } from "typedi";
import { Iproduct, Product } from "../../../models/productModel";
import { BasRepository } from "../baseRepository";
import { logError } from "@/utils/logger_utils";

@Service()
export class productRepository extends BasRepository<Iproduct>{

    constructor(){
        super(Product)
    }
    async findByUser(id:string){
        try {
            const f= await Product.find({seller:id}).populate({path:'category',match: { isActive: true }})            
            return f
        } catch (error) {
            logError(error)
            throw new Error('errofrom fetching the products')
        }
    }
    async findByStatus(status:boolean){
        try {
            return await Product.find({isApproved:status}).populate('seller','-password').populate('category')
        } catch (error) {
            logError(error)
            throw new Error('failed to find  post')
        }
    }
    async findByApproved(id:string){
        try {
            return await Product.find({ seller:id , isApproved:true})
        } catch (error) {
            logError(error)
            throw new Error('failed to findApproved post')
        }
    }
}