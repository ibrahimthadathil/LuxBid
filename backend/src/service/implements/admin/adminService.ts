import Container, { Service } from "typedi";
import { adminRepository } from "../../../repositories/implimentation/admin/admin_Repository";
import { comparePassword, hashPassword } from "../../../utils/hash_utils";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt_util";
import { exit } from "process";
import { userRepository } from "../../../repositories/implimentation/userRepository";


@Service()
export class admin_Service{
  private userRepo
    constructor(private adminRepo : adminRepository){
      this.userRepo = Container.get(userRepository)
    }

    async admin_signin(email:string,Password:string){
       try {
        const exist = await this.adminRepo.findByEmail(email)
        if(exist){
          const password = comparePassword(Password,exist.password) 
          if(!password) return { success:false , message :'Invalid Credentials'}
          const AccessToken = generateAccessToken({id:exist._id,email:exist.email})
          const RefreshToken = generateRefreshToken({id:exist._id,email:exist.email})
          return { success:true , refresh : RefreshToken ,access:AccessToken,message :'Logged in successfully' ,name:exist.fullName ,adminEmail:email }
          
        }else{

          return { success : false , message :'Invalid Credentials'}

        }

        
       } catch (error) {
        
        console.log(error);
        throw new Error((error as Error).message)        
       }
        
    }

    async fetch_user(){
      try {
        const users = await this.userRepo.findAll()
        if(users){
          return {success :true , data:users}
        }
        throw new Error ('failed to fetch user')
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


