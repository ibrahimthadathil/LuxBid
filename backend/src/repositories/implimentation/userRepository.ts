import { User , Iuser } from "../../models/userModel";
import { userService } from "../../service/userService";
import { BasRepository } from "./basre_repository";
// import
  class userRepository extends BasRepository<Iuser>{
    
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

export const userRepo = new userRepository()
