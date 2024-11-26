import Container, { Service } from "typedi";
import { admin_Service } from "../../../service/implements/admin/admin_AuthService";
import { Request, Response } from "express";
import { userManagement } from "../../../service/implements/admin/admin_userService";
import { IadminController } from "../../interface/controller_Interface";

@Service()
class AdminController implements IadminController{
  constructor(
    private adminService: admin_Service,
    private userService : userManagement,
  ) {}
  async adminSignIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      
      const { success, access, message,adminEmail,name } = await this.adminService.admin_signin(email, password);
      if (success) {
        res
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
      const role = req.params.role
      const {data,success} = await this.userService.findAllUsers(role)
      if(success){
        res.status(200).json({data})
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
         const response = await this.userService.update_user(email)
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
