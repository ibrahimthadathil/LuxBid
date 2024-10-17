import { error } from "console";
import { Iuser } from "../models/userModel";
import { userRepo } from "../repositories/userRepository";
import { hashPassword } from "../utils/hash_utils";
import { generate_OTP } from "../utils/otp_util";
import { sendOTPMail } from "../utils/Gmail_utils";
import { generateAccessToken } from "../utils/jwt_util";
import { OTP_repository } from "../repositories/otpRepository";


class UserService{

    async createUser( userDetails : Iuser ){
    const existUser = await userRepo.findUserByEmail(userDetails.email)
    if(existUser) throw new Error('User Already Exist')
    const hashedPass = hashPassword(userDetails.password)
    const OTP = generate_OTP()
    console.log('Register OTp :- ', OTP )                        //   otp consoled here
    const token = generateAccessToken(userDetails)
    await sendOTPMail(userDetails.email ,'Registration',OTP)
    await OTP_repository.send_OTP(userDetails.email,OTP)
     
    }

}


export const userService = new UserService()
 