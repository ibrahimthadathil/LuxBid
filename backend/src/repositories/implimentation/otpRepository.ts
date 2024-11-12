import { Service } from "typedi";
import { Iopt, otpModel } from "../../models/otpModel";
import { BasRepository } from "./base_repository";

@Service()
export class otpRepository extends BasRepository<Iopt>{
    
    constructor(){
        super(otpModel)
    }

   async create_OTP( email:string , otp:string ){
        try {
             await this.create({email,otp})
            
            } catch (error) {
                console.error("Error saving OTP:", error);
                throw new Error("Could not save OTP");
        }
    }

    async findOTPByMail(otp:string,email:string):Promise<Iopt | null>{

    try {
    
            return await otpModel.findOne({email , otp })

        } catch (error) {

            throw new Error("Could not find OTP"),console.log('Error found in matching otp') 

        }
    }
}

// export const OTP_repository = new otpRepository()