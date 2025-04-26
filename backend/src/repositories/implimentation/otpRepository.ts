import { Service } from "typedi";
import { Iopt, otpModel } from "../../models/otpModel";
import { BasRepository } from "./baseRepository";
import { logError } from "@/utils/logger_utils";

@Service()
export class otpRepository extends BasRepository<Iopt> {
  constructor() {
    super(otpModel);
  }

  async create_OTP(email: string, otp: string) {
    try {
      await this.create({ email, otp });
    } catch (error) {
      console.error("Error saving OTP:", error);
      throw new Error("Could not save OTP");
    }
  }

  async findOTPByMail(otp: string, email: string): Promise<Iopt | null> {
    try {
      return await otpModel.findOne({ email, otp });
    } catch (error) {
      logError(error);
      throw (
        (new Error("Could not find OTP"),
        console.log("Error found in matching otp"))
      );
    }
  }
}

