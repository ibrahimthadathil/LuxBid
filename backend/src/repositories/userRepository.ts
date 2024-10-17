import { User , Iuser } from "../models/userModel";
import { userService } from "../service/userService";
class userRepository{
    async saveUser(){
         
    }

    async findUserByEmail(email:string):Promise<Iuser | null>{

        return await User.findOne({email})

    }
}

export const userRepo = new userRepository()
