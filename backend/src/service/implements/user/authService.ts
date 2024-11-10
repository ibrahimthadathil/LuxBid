import { Iuser } from "../../../models/userModel";
import { comparePassword, hashPassword, RandomPassword } from "../../../utils/hash_utils";
import { generateAccessToken} from "../../../utils/jwt_util";
import { JwtPayload } from "jsonwebtoken";
import  { Service} from "typedi";
import { userRepository } from "../../../repositories/implimentation/userRepository";
import { IauthService } from "../../interface/service_Interface";
import { otpService } from "./otpService";
import { tokenService } from "./tokenService";
import { emailService } from "./emailService";
  
@Service()
export class authService implements IauthService{

    constructor(
        private userRepo :userRepository ,
        private otpService :otpService ,
        private tokenservice : tokenService,
        private emailservice : emailService

     ){
    
    }
    
    async createUser( email : string ){    
        const existUser = await this.userRepo.findUserByEmail( email )
        if(existUser && existUser.isVerified) return {message:'user already exist'} 
        if(existUser && !existUser.isVerified ){
            const OTP = await this.otpService.createOTP(existUser.email) 
            const token = this.tokenservice.generate_AccessToken({email,id:existUser._id})
            await this.emailservice.sendOtpEmail(email , 'Registration',OTP)
            return { token, success : false , message : 'OTP hasbeen send'} 
        }
        let Accesstoken = generateAccessToken<Iuser>({email})
        return { token:Accesstoken , success : true , message: 'Complete Profile' } 
    }

    async verifyotp (otp:string,token:string){
       
        try {

            const {email ,id} = this.tokenservice.verify_Token(token) as JwtPayload
            if(email){
                const isValidOTP = await this.otpService.verifyOTP(email,otp)
                if (!isValidOTP) return {success : false ,message:'invalid OTP' };
                const updatedUser= await this.userRepo.update(id,{isVerified:true})
                console.log('updated user',updatedUser,);
                const Accesstoken =this.tokenservice.generate_AccessToken({email,id})
                const RefreshToken =this.tokenservice.generate_RefreshToken({email,id})
                return {success:true ,token:Accesstoken,refresh :RefreshToken ,message:'otp verification completed',name:updatedUser?.firstName,email:updatedUser?.email}

            }else return {success:false , message:'Access denied '}

        } catch (error) {
            console.log(error);
            throw new Error('Token verification failed');
        }
        
    }

    async registerUser(userDetails:Iuser , token :string){
        try {
            let {email} = this.tokenservice.verify_Token(token) as JwtPayload
            if(email){
                const hashedPass =await hashPassword(userDetails.password)
                userDetails.email = email
                userDetails.password = hashedPass
                const newUser = await this.userRepo.create(userDetails)
                if(newUser){
                    const Accesstoken =this.tokenservice.generate_AccessToken({id:newUser._id,email})
                    const OTP = await this.otpService.createOTP(email) //   otp consoled inside
                    await this.emailservice.sendOtpEmail(email , 'Registration' , OTP)
                    return {success:true,message:'Email hasbeen send...',token:Accesstoken}
                    
                }else{
                    throw new Error("couldn't save user")
                }
            }else{
                return {success:false , message :'invalid token'}
            }

        } catch (error) {
            console.log((error as Error).message)
            return {success:false,message:(error as Error).message}
        }
    }

    async verifySignIn(email:string,password:string){
        try {
            const exist = await this.userRepo.findUserByEmail(email)
            if(exist){
               const passwordCheck =await comparePassword(password,exist.password)
               if(!passwordCheck){
                return {success:false , message:'Invalid password...!'}
               }else{
                if(exist.isActive){
                    const Accesstoken =this.tokenservice.generate_AccessToken({email:exist.email,id:exist._id})
                    const RefreshToken =this.tokenservice.generate_RefreshToken({email:exist.email,id:exist._id})
                    return {success:true ,refresh:RefreshToken ,message: 'succesfully logged In..!',token:Accesstoken ,email : exist.email ,name:exist.firstName }
                }else{
                    return {success:false , message:'Entry restricted, Contact support'}
                }
               }     

            }else{
                return {success:false , message:'Not a verified user'}
            }
            
        } catch (error) {
            console.log(error ,'from signIn');
            return { success: false, message: 'An error occurred while signing in.' };
        }
    }

    async verifyGoogle(userDetails :Iuser){
        try {

            const existUser = await this.userRepo.findUserByEmail(userDetails.email)
            if(existUser){
                const Accesstoken = generateAccessToken({id:existUser._id,email:existUser.email})
                return {success:true ,token:Accesstoken ,message:'Google Authentication successful'}
            }
            const randomPassword = await RandomPassword()
            userDetails.password = randomPassword
            userDetails.isVerified = true
            const response = await this.userRepo.create(userDetails)
            const Accesstoken = generateAccessToken<Iuser>({id:response._id,email:response.email})
            const RefreshToken = this.tokenservice.generate_RefreshToken({id:response._id,email:response.email})
            return {success:true , token :Accesstoken ,refresh :RefreshToken, message:'Google Authentication successful'}
            
        } catch (error) {
            console.log(error);
            return {success:false , message :(error as Error).message }
            
        }
    }

    async forget_Password(email:string){
        try {
            console.log(email,'12345');
            
            const existUser = await this.userRepo.findUserByEmail(email)
            console.log(existUser , 'us');
            
            if(!existUser)return { success : false , message : 'you are not a verified user'}
            const OTP = await this.otpService.createOTP(email)
            const AccessToken =this.tokenservice.generate_AccessToken({id:existUser._id,email:existUser.email})
            await this.emailservice.sendOtpEmail(existUser.email,'Forgett password',OTP)
            return { success : true , token : AccessToken , message : ' OTP hasbeen send'}
        } catch (error) {
            console.log(error)
            return { success : false , message : (error as Error).message } 
        }
    }

    async reset_otp(token:string , otp : string){
        try {
            const {email} = this.tokenservice.verify_Token(token) as JwtPayload
            if(email){
                const checkOTP = await this.otpService.verifyOTP(email,otp)
                if(checkOTP){
                    const user = await this.userRepo.findUserByEmail(email)
                    const AccessToken =this.tokenservice.generate_AccessToken({id:user?._id ,email})
                    return {success:true,message:'otp verified',token:AccessToken}
                }else{
                    return { success:false ,message:'invalid OTP'}
                }
            }
            return { success :false ,message:'Access token failed'}
            
            
        } catch (error) {
            console.log(error);
            return {success:false , message:(error as Error).message}
        }
    }

    async reset_Password(password:string,confirmPassword:string ,Token:string){
        try {
            if(password !==confirmPassword)return {success : false ,message :'password not match'}
            const hashedPass = await hashPassword(password)
            const {email,success} = this.tokenservice.verify_Token(Token) as JwtPayload
            
            if(email){

                const user = await this.userRepo.findUserByEmail(email);
                if(!user) return {success:false,message:'Invalid user email'}
                await this.userRepo.update((user?._id as string),{password:hashedPass})
                return {success:true ,message:'password hasbeen changed'}
            }
            console.log('jjj');
            
            return {success:false,message:'Invalid access'}
        } catch (error) {
            console.log(error);
            return {success:false,message:(error as Error).message}
                      
        }
    }

    

}



 