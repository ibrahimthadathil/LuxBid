import { Service } from "typedi";
import { otpRepository } from "../../../repositories/implimentation/otpRepository";
import { generate_OTP } from "../../../utils/otp_util";
import { IOtpService } from "../../interface/service_Interface";
@Service()
export class otpService implements IOtpService{
    constructor( private otpRepo : otpRepository){}
    async createOTP(email :string):Promise<string>{
        const OTP = generate_OTP()
        console.log(`generated OTP :- ${OTP}`)
        await this.otpRepo.create_OTP(email,OTP)
        return OTP
    }

    async verifyOTP(email: string, otp: string): Promise<boolean> {
        const checkOTP = await this.otpRepo.findOTPByMail(otp, email);
        return checkOTP !== null;
    }

}