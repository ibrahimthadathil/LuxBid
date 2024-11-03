import Container, { Service } from "typedi";
import { admin_Service } from "../../../service/implements/admin/adminService";
import { Request, Response } from "express";
import { error } from "console";

@Service()
class AdminController {
  constructor(private adminService: admin_Service) {}
  async adminSignIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      
      
      const { success, access, refresh, message,adminEmail,name } = await this.adminService.admin_signin(email, password);
      if (success) {
        const expire = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        res
        .cookie("refreshtoken", refresh || "", {
          httpOnly: true,
          expires : expire,
        })
          .status(200)
          .json({ message: message , token : access ,success :true , email:adminEmail , name})
      } else {
        res
          .status(401)
          .json({ message: "invalid credentials", success: false });
      }
    } catch (error) {}
  }
  async fetchUsers(req:Request,res:Response){
    try {
      const response = await this.adminService.fetch_user()
      if(response){
        res.status(200).json({data:response.data})
      }else{
        throw new Error('failed to  fetch user')
      }
      
    } catch (error) {
      res.status(500).json({message: (error as Error ).message})
    }
  }

  async updateUser (req:Request , res:Response){
    try {
        const email = req.params.id
        if(email){
         const response = await this.adminService.update_user(email)
         if(response.success){
          res.status(200).json({message:response.message})
         }else{
          res.status(400).json({message:response.message})
         }
        }
        
    } catch (error) {
      res.status(500).json({message:'internal server error'})
    }
  }

}

export const adminController = Container.get(AdminController);
