import { Service } from "typedi";
import { ISeller, Organizer } from "../../models/organizerModel";
import { BasRepository } from "./baseRepository";
import { networkInterfaces } from "os";

@Service()
export class organizerRepository extends BasRepository<ISeller>{

    constructor(){
        super(Organizer)
    }
    async findUserById(userId:string){
        try {
            console.log(userId,'00000000000');
            
            return await Organizer.findOne({user:userId}).populate({path:'user',select:'-password'})
          
        } catch (error) {
            throw new Error('Error from finding Seller')
        }
    }

}