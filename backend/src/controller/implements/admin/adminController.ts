import Container, { Service } from "typedi";
import { admin_Service } from "../../../service/implements/admin/admin_AuthService";
import { Request, Response } from "express";
import { admin_userService } from "../../../service/implements/admin/admin_userService";
import { IadminController } from "../../interface/adminController_Interface";
import { setCookie } from "../../../utils/cookie_utils";

@Service()
class AdminController implements IadminController{
  constructor(
    private adminService: admin_Service,
    private userService : admin_userService,
  ) {}
  async adminSignIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      
      const { success, access, message,adminEmail,name,refresh } = await this.adminService.admin_Signin(email, password);
      if (success) {
        setCookie(res,'admtkn',refresh as string)
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
      const {data,success} = await this.userService.findAll_Users(role)
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
         const response = await this.userService.update_User(email)
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
  async adminLogout(req:Request,res:Response){
    try {
      res.clearCookie('admtkn')
      res.status(200).json({message:'loggedOUt'})
    } catch (error) {
      res.status(500).json({message:"Couldn't cleare the the credantial"})
    }
  }

}

export const adminController = Container.get(AdminController);
