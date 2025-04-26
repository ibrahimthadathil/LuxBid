import { Service } from "typedi";
import { adminRepository } from "../../../repositories/implimentation/admin/admin_Repository";
import { comparePassword } from "../../../utils/hash_utils";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../utils/jwt_util";
import { IadminAuth } from "../../interface/adminService_Interface";
import { logError } from "@/utils/logger_utils";

@Service()
export class admin_Service implements IadminAuth {
  constructor(private adminRepo: adminRepository) {}

  async admin_Signin(email: string, Password: string) {
    try {
      const exist = await this.adminRepo.findByEmail(email);
      if (exist) {
        const password = await comparePassword(Password, exist.password);
        if (!password)
          return { success: false, message: "Invalid Credentials" };
        const AccessToken = generateAccessToken({
          id: exist._id,
          email: exist.email,
        });
        const RefreshToken = generateRefreshToken({
          id: exist._id,
          email: exist.email,
        });
        return {
          success: true,
          refresh: RefreshToken,
          access: AccessToken,
          message: "Logged in successfully",
          name: exist.fullName,
          adminEmail: email,
        };
      } else {
        return { success: false, message: "Invalid Credentials" };
      }
    } catch (error) {
      logError(error);
      throw new Error((error as Error).message);
    }
  }
}
