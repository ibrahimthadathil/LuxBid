import { Service } from "typedi";
import { userRepository } from "../../../repositories/implimentation/userRepository";
import { Iusermangament } from "../../../controller/interface/controller_Interface";

@Service()
export class userManagement implements Iusermangament{
    constructor(private userRepo : userRepository){

    }
    async findAllUsers(role:string){
        try {
            const users = await this.userRepo.finduserByRole(role)            
            if(users){
                return {success :true , data :users}
            }else{
                throw new Error('faild to fetch user')
            }

        } catch (error) {

            throw new Error ((error as Error).message)

        }
    }
    
    async update_user(email:string){ 
        try {
          const user=await this.userRepo.findUserByEmail(email);
          if(user) {
            user.isActive=!user.isActive;
             await user?.save()
            return {success: true , message:' status changed'}
          }else{            
            return {success : false ,message :'action failed'}  
          }
        } catch (error) {
          throw new Error ('internal error')
        }
      }

}