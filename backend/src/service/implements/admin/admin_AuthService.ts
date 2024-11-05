import { Service } from "typedi";
import { adminRepository } from "../../../repositories/implimentation/admin/admin_Repository";
import { comparePassword} from "../../../utils/hash_utils";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../utils/jwt_util";


@Service()
export class admin_Service {
  constructor(private adminRepo: adminRepository) {}

  async admin_signin(email: string, Password: string) {
    try {
      const exist = await this.adminRepo.findByEmail(email);
      if (exist) {
        const password = comparePassword(Password, exist.password);
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
      console.log(error);
      throw new Error((error as Error).message);
    }
  }
}
