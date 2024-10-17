import { otpModel } from "../models/otpModel";


class otpRepository{

   async send_OTP( email:string , otp:string ){
        try {

            let newOtp = await otpModel.create({ email , otp })
            
            } catch (error) {
                console.error("Error saving OTP:", error);
                throw new Error("Could not save OTP");
        }
    }
}

export const OTP_repository = new otpRepository()