import { Service } from "typedi";
import { User , Iuser } from "../../models/userModel";
import { BasRepository } from "./base_repository";


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
}




