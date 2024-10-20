import { Iuser } from "../models/userModel";
import { userRepo } from "../repositories/implimentation/userRepository";
import { comparePassword, hashPassword } from "../utils/hash_utils";
import { generate_OTP } from "../utils/otp_util";
import { sendOTPMail } from "../utils/Gmail_utils";
import { generateAccessToken, verifyToken } from "../utils/jwt_util";
import { OTP_repository } from "../repositories/implimentation/otpRepository";
import { Iopt } from "../models/otpModel";
import { JwtPayload } from "jsonwebtoken";


class UserService{

    

    async createUser( userDetails : Iuser ):Promise<{message:string,token?:string}>{
        const existUser = await userRepo.findUserByEmail(userDetails.email)
        if(existUser) return {message:'user already exist'}
        const OTP = generate_OTP()
        console.log('Register OTp :- ', OTP )                        //   otp consoled here
        const token = generateAccessToken<Iuser>(userDetails)
        await sendOTPMail(userDetails.email ,'Registration',OTP)
        await OTP_repository.send_OTP(userDetails.email,OTP)
        console.log(token)
        return {token,message:'email hasbeen sended'} 
    }

    async verifyotp (otp:string,token:string):Promise<string|Boolean|undefined>{    
       
        try {

            let {email} = verifyToken(token) as JwtPayload 
            if(email){
                const checkUser = await OTP_repository.findOTPByMail(otp,email)
                if (!checkUser) return false;
                const Accesstoken = generateAccessToken<Iopt>({email:checkUser?.email}) 
                return Accesstoken

            }else return false

        } catch (error) {
            console.log(error);
            throw new Error('Token verification failed');
        }
        
    }

    async registerUser(userDetails:Iuser , token :string){
        try {
            let {email} = verifyToken(token) as JwtPayload
            const hashedPass =await hashPassword(userDetails.password)
            userDetails.email = email
            userDetails.password = hashedPass
            const newUser = await userRepo.create(userDetails)
            if(newUser){
                const Accesstoken = generateAccessToken<Iuser>({id:newUser._id,email})
                return {message:'user registerd succesfully',token:Accesstoken}

            }else{
                throw new Error("couldn't save user")
            }

        } catch (error) {
            console.log(error)
            throw new Error("couldn't register a user")
        }
    }

    async verifySignIn(email:string,password:string){
        try {
            const exist = await userRepo.findUserByEmail(email)
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
            
        }
    }

    

}


export const userService = new UserService()
 