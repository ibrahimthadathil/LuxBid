import { Service } from "typedi";
import { sendOTPMail } from "../../../utils/Gmail_utils";
import { IEmailService } from "../../interface/service_Interface";

@Service()
export class emailService implements IEmailService{
    async sendOtpEmail(email:string ,OTP :string , subject :string){
        return sendOTPMail(email , subject , OTP)
    }
}