import { Service } from "typedi";
import { userRepository } from "../../../repositories/implimentation/userRepository";
import { s3Service } from "./uploadService";
import { Iuser } from "../../../models/userModel";


@Service()
export class userService {
  constructor(private userRepo: userRepository,private s3Services : s3Service) {}

  async upload_Profile(userId:string,file:Express.Multer.File){
    try {
      const currentUser = await this.userRepo.findById(userId)
      if(currentUser){
       const {success ,Location} = await this.s3Services.upload_File(file,'Profile')
       if(success){
       this.userRepo.update(currentUser._id as string,{profile:Location})
       return {success:true , message:'Profile updated'}
       }else return {success: false , message:'updation failed'}  
      }else throw new Error('User not found')
    } catch (error) {
      console.log(error);
      return {success:false , message:(error as Error).message}
    }
  }

  async editProfile(data:Iuser,userId:string){
    try {
      const response =await this.userRepo.update(userId,data)
      if(response){
        return {success:true , message:'Details updated'}
      }else throw new Error('Failed to update')
    } catch (error) {
      console.log('from update details');
      throw new Error((error as Error).message)
    }
  }   
}
