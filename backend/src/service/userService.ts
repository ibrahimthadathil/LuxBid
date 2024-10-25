import { Iuser } from "../models/userModel";
import { comparePassword, hashPassword } from "../utils/hash_utils";
import { generate_OTP } from "../utils/otp_util";
import { sendOTPMail } from "../utils/Gmail_utils";
import { generateAccessToken, verifyToken } from "../utils/jwt_util";
import { OTP_repository } from "../repositories/implimentation/otpRepository";
import { Iopt } from "../models/otpModel";
import { JwtPayload } from "jsonwebtoken";
import { Service } from "typedi";
import { userRepository } from "../repositories/implimentation/userRepository";
 
@Service()
export class UserService{

    constructor(private userRepo :userRepository){}
    
    async createUser( email : string ):Promise< { message : string , token? : string , success? : boolean }>{    
        const existUser = await this.userRepo.findUserByEmail( email )
        if(existUser && existUser.isVerified) return {message:'user already exist'} 
        
        if(existUser && !existUser.isVerified ){
            const OTP = generate_OTP()
            console.log('Register OTp :- ', OTP )     //   otp consoled here
            const token = generateAccessToken<Iuser>( {email,id:existUser._id} )
            await sendOTPMail(email , 'Registration' , OTP)
            await OTP_repository.send_OTP( email , OTP )
            return { token, success : false , message : 'email hasbeen send'} 
        } 
        let Accesstoken = generateAccessToken<Iuser>({email})
        return { token:Accesstoken , success : true , message: 'Complete details' } 
    }

    async verifyotp (otp:string,token:string):Promise<{success:boolean,token?:string ,message?:string}>{    
       
        try {

            let {email ,id} = verifyToken(token) as JwtPayload 

            if(email){
                const checkUser = await OTP_repository.findOTPByMail(otp,email)
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
            const hashedPass =await hashPassword(userDetails.password)
            userDetails.email = email
            userDetails.password = hashedPass
            const newUser = await this.userRepo.create(userDetails)
            if(newUser){
                const Accesstoken = generateAccessToken<Iuser>({id:newUser._id,email})
                const OTP = generate_OTP()
                console.log('Register OTp :- ', OTP )     //   otp consoled here
                await sendOTPMail(email , 'Registration' , OTP)
                await OTP_repository.send_OTP( email , OTP )
                return {message:'Email hasbeen send...',token:Accesstoken}

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
            
        }
    }

    

}



 