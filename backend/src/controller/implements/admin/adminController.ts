import Container, { Service } from "typedi";
import { admin_Service } from "../../../service/implements/admin/admin_AuthService";
import { Request, Response } from "express";
import { admin_userService } from "../../../service/implements/admin/admin_userService";
import { IAdminController } from "../../interface/adminController_Interface";
import { setCookie } from "../../../utils/cookie_utils";
import { HttpStatus, responseMessage } from "@/enums/http_StatusCode";
import { logError } from "@/utils/logger_utils";

@Service()
class AdminController implements IAdminController{
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
          .status(HttpStatus.OK)
          .json({ message: message , token : access ,success :true , email:adminEmail , name})
      } else {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: responseMessage.INVALID_REQUEST, success: false });
      }
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: (error as Error ).message})
    }
  }
  async fetchUsers(req:Request,res:Response){
    try {
      const role = req.params.role
      const {data,success} = await this.userService.findAll_Users(role)
      
      if(success){
        res.status(HttpStatus.OK).json({data})
      }else{
        throw new Error('failed to fetch user')
      }
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: (error as Error ).message})
    }
  }
  async updateUser (req:Request , res:Response){
    try {
        const email = req.params.id        
        if(email){
         const response = await this.userService.update_User(email)
         if(response.success){
          res.status(HttpStatus.OK).json({message:response.message})
         }else{
          res.status(HttpStatus.BAD_REQUEST).json({message:response.message})
         }
        }
        
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'internal server error'})
    }
  }
  async adminLogout(req:Request,res:Response){
    try {
      res.clearCookie('admtkn')
      res.status(HttpStatus.OK).json({message:'loggedOut'})
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.INTERNAL_ERROR})
    }
  }
  

}

export const adminController = Container.get(AdminController);
