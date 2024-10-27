import { Iuser } from "../models/userModel";
import { comparePassword, hashPassword, RandomPassword } from "../utils/hash_utils";
import { generate_OTP } from "../utils/otp_util";
import { sendOTPMail } from "../utils/Gmail_utils";
import { generateAccessToken, verifyToken } from "../utils/jwt_util";
import  {otpRepository}  from "../repositories/implimentation/otpRepository";
import { Iopt } from "../models/otpModel";
import { JwtPayload } from "jsonwebtoken";
import Container, { Service, Token } from "typedi";
import { userRepository } from "../repositories/implimentation/userRepository";
 
@Service()
export class UserService{
    
    private otpRepo

    constructor(private userRepo :userRepository , otpRepo : otpRepository){
        this.otpRepo = Container.get(otpRepository)
    }
    
    async createUser( email : string ):Promise< { message : string , token? : string , success? : boolean }>{    
        const existUser = await this.userRepo.findUserByEmail( email )
        if(existUser && existUser.isVerified) return {message:'user already exist'} 
        
        if(existUser && !existUser.isVerified ){
            const OTP = generate_OTP()
            console.log('Register OTp :- ', OTP )     //   otp consoled here
            const token = generateAccessToken<Iuser>( {email,id:existUser._id} )
            await sendOTPMail(email , 'Registration' , OTP)
            await this.otpRepo.create_OTP( email , OTP )
            return { token, success : false , message : 'OTP hasbeen send'} 
        } 
        let Accesstoken = generateAccessToken<Iuser>({email})
        return { token:Accesstoken , success : true , message: 'Complete details' } 
    }

    async verifyotp (otp:string,token:string):Promise<{success:boolean,token?:string ,message?:string}>{    
       
        try {

            let {email ,id} = verifyToken(token) as JwtPayload 
            
            if(email){
                const checkUser = await this.otpRepo.findOTPByMail(otp,email)
                if (!checkUser) return {success : false ,message:'invalid OTP' };
                await this.userRepo.update(id,{isVerified:true})
                const Accesstoken = generateAccessToken<Iopt>({email:checkUser?.email ,id}) 
                return {success:true ,token:Accesstoken ,message:'otp verification completed'}

            }else return {success:false , message:'Access denied '}

        } catch (error) {
            console.log(error);
            throw new Error('Token verification failed');
        }
        
    }

    async registerUser(userDetails:Iuser , token :string){
        try {
            let {email} = verifyToken(token) as JwtPayload 
            if(email){

                const hashedPass =await hashPassword(userDetails.password)
                userDetails.email = email
                userDetails.password = hashedPass
                const newUser = await this.userRepo.create(userDetails)
                if(newUser){
                    const Accesstoken = generateAccessToken<Iuser>({id:newUser._id,email})
                    const OTP = generate_OTP()
                    console.log('Register OTp :- ', OTP )     //   otp consoled here
                    await sendOTPMail(email , 'Registration' , OTP)
                    await this.otpRepo.create_OTP( email , OTP )
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
                return {success:false , status:'Invalid password...!'}
               }else{
                const Accesstoken = generateAccessToken<Iuser>({email:exist.email,id:exist._id})
                return {success:true , status: 'succesfully logged In..!',token:Accesstoken}
               }     

            }else{
                return {success:false , status:'Not a verified user'}
            }
            
        } catch (error) {
            console.log(error ,'from signIn');
            
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
            return {sucsess:true , token :Accesstoken , message:'Google Authentication successful'}
            
        } catch (error) {
            console.log(error);
            return {success:false , message :(error as Error).message }
            
        }
    }

    async forget_Password(email:string){
        try {
            const existUser = await this.userRepo.findUserByEmail(email)
            if(!existUser)return { success : false , message : 'you are not a verified user'}
            const OTP = generate_OTP();
            console.log(`forget otp ${OTP}`);
            const AccessToken = generateAccessToken<Iuser>({id:existUser._id,email:existUser.email})
            await sendOTPMail(existUser.email,'Forgett password',OTP)
            await this.otpRepo.create_OTP( existUser.email , OTP)
            return { success : true , token : AccessToken , message : ' OTP hasbeen send'}
        } catch (error) {
            console.log(error)
            return { success : false , message : (error as Error).message } 
        }
    }

    async reset_otp(token:string , otp : string){
        try {
            const {email} = verifyToken(token) as JwtPayload
            if(email){
                const checkOTP = await this.otpRepo.findOTPByMail(otp,email)
                if(checkOTP){
                    const user = await this.userRepo.findUserByEmail(email)
                    const AccessToken = generateAccessToken({id:user?._id ,email})
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

    async reset_Password(password:string ,Token:string){
        try {
            const hashedPass = await hashPassword(password)
            const {email} = verifyToken(Token) as JwtPayload
            if(email){
                const user = await this.userRepo.findUserByEmail(email);
                if(!user) return {success:false,message:'Invalid user email'}
                await this.userRepo.update((user?._id as string),{password:hashedPass})
                const AccessToken = generateAccessToken({id:user._id,email:user.email})
                return {success:true ,token:AccessToken ,message:'password hasbeen changed'}
            }
            return {success:false,message:'Invalid access'}
        } catch (error) {
            console.log(error);
            return {success:false,message:(error as Error).message}
                      
        }
    }

    

}



 