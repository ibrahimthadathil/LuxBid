import { Service } from "typedi";
import { Buyer, IBuyer } from "../../models/buyerModel";
import { BasRepository } from "./baseRepository";

@Service()
export class BuyerRepository extends BasRepository<IBuyer>{

    constructor(){
        super(Buyer)
    }
    async findByUserId(id:string){
        try {

           return await Buyer.findOne({user:id}).populate({path:'user',select:'-password'})
            
        } catch (error) {
            console.log((error as Error).message);
            throw new Error('Error from finding buyer')
            
        }

    }
}