import Container, { Service } from "typedi";
import { admin_Service } from "../../service/admin/adminService";
import { Request, Response } from "express";

@Service()
class AdminController {
  constructor(private adminService: admin_Service) {}
  async adminSignIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { success, access, refresh, message } = await this.adminService.admin_signin(email, password);
      if (success) {
        const expire = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        res
        .cookie("refreshtoken", refresh || "", {
          httpOnly: true,
          expires : expire,
        })
          .status(200)
          .json({ message: message , token : access ,success :true})
      } else {
        res
          .status(401)
          .json({ message: "invalid credentials", success: false });
      }
    } catch (error) {}
  }
}

export const adminController = Container.get(AdminController);
