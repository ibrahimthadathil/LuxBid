import { Service } from "typedi";
import { userRepository } from "../../../repositories/implimentation/userRepository";
import { s3Service } from "./uploadService";
import { Iuser } from "../../../models/userModel";
import { IuserService } from "../../interface/userService_Interface";


@Service()
export class userService implements IuserService{
  constructor(private userRepo: userRepository,private s3Services : s3Service) {}

  async upload_Profile(userId:string,file:Express.Multer.File){
    try {
      const currentUser = await this.userRepo.findById(userId)
      if(currentUser){
       const response = await this.s3Services.upload_File(file,'Profile')
       if(!Array.isArray(response)){
        if(response.success){
          this.userRepo.update(currentUser._id as string,{profile:response.Location})
          return {success:true , message:'Profile updated'}
       }else throw new Error('error occured in file upload')
       }else return {success: false , message:'updation failed'}  
      }else throw new Error('User not found')
    } catch (error) {
      console.log(error);
      return {success:false , message:(error as Error).message}
    }
  }

  async edit_Profile(data:Iuser,userId:string){
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
