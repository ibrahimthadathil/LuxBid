import { Service } from "typedi";
import { User , Iuser } from "../../models/userModel";
import { BasRepository } from "./baseRepository";


@Service()
export class userRepository extends BasRepository<Iuser>{
    
    constructor(){
        super(User)
    }

    async findUserByEmail(email:string):Promise<Iuser | null>{
        try {
            
            return await User.findOne({email})

        } catch (error) {

            throw new Error('caught error from exist user check')

        }

    }
    async finduserByRole(role:string){
        try {
            return await User.find({role:role},'-password')
        } catch (error) {
            throw new Error('caught error from find by role ')
        }
    }
    async usersByGender(){
        try {
           return await User.aggregate([
                {$facet:{
                    totalUsers:[{$group:{_id:"$gender",count:{$sum:1}}}],
                }}
            ])
        } catch (error) {
            throw new Error('failed to fetch')
        }
    }
    
}




