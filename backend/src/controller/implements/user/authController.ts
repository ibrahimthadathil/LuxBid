import { Request, Response } from "express";
import { Iuser } from "../../../models/userModel";
import { Iopt } from "../../../models/otpModel";
import { Container, Service } from "typedi";
import { authService } from "../../../service/implements/user/authService";
import { IAuthController } from "../../interface/authController_Interface"
import { setCookie } from "../../../utils/cookie_utils";
import { AuthRequest } from "../../../types/api";
import { HttpStatus, responseMessage } from "@/enums/http_StatusCode";
import logger, { logDebug, logError } from "@/utils/logger_utils";

@Service()
class AuthController implements IAuthController {
  constructor(
    private authService: authService
  ) {}

  async Signup(req: Request, res: Response) {
    try {
      const userData: Iuser = req.body;
      const { message, token, success } = await this.authService.create_User(
        userData.email
      );
      if (!token && !success) {
        res.status(HttpStatus.CONFLICT).json({ response: message, success: false });
       
      } else {
        res.status(HttpStatus.OK).json({ token: token, response: message, success });
      }
    } catch (error) {
      logError(error)
      
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          response: responseMessage.ERROR_MESSAGE,
          error: (error as Error).message,
        });
    }
  }

  async verifyOTP(req: Request, res: Response) {
    try {
      
      const { otp } = req.body;
      const token = req.headers.authorization as string; 
      if(otp){
        const response = await this.authService.verify_otp(otp, token);
        if (!response.success){
          res.status(HttpStatus.UNAUTHORIZED).json({ message: response.message });
  
        }else{
          // req.session.userId = response.user as string
          setCookie(res, "rftn", response.refresh as string);
          res
            .status(HttpStatus.OK)
            .json({
              success: true,
              token: response.token,
              message: response.message,
              name: response.name,
              email: response.email,
            });
  
        }
      }else res.status(HttpStatus.UNAUTHORIZED).json({ message: "OTP Required..!" });
    } catch (error) {
      logError(error)
      if ((error as Error).message == "Token verification failed") {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: "Invalid token" });
      }
    }
  }

  async register(req: Request, res: Response) {
    try {
      const userDetails: Iuser = req.body;
      const token = req.headers.authorization as string;
      const response = await this.authService.register_User(userDetails, token);
      console.log(response.success);
      
      if (response.success) {
        res
          .status(HttpStatus.OK)
          .json({ token: response.token, message: response.message });
      } else {
        res.status(HttpStatus.FORBIDDEN).json({ message: response.message });
      }
    } catch (error) {
      logError(error)
      console.log(error);
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      console.log(email,password,'lll');
      
      const response = await this.authService.verify_SignIn(email, password);
      console.log('000',response);
      
      if (response?.success) {
        setCookie(res, "rftn", response.refresh as string);
        setCookie(res,'authtkn',response.roleAccess as string)
        res
          .status(HttpStatus.OK)
          .json({
            token: response.token,
            success: true,
            message: response.message,
            email: response.email,
            name: response.name,
          });
      } else {
        console.log("check",response.message);
        res.status(HttpStatus.UNAUTHORIZED).json({success:response.success,message:response.message});
      }
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: (error as Error).message });
    }
  }

  async googleAuth(req: Request, res: Response) {
    const userDetails: Iuser = req.body;
    try {
      const { success, message, token, refresh ,roleAccess} =
        await this.authService.verify_Google(userDetails);
      if (success) {
        setCookie(res,'authtkn',roleAccess as string)
        setCookie(res, "rftn", refresh as string);
        res
          .status(HttpStatus.OK)
          .json({ AccessToken: token, message: message, success: true });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: message });
      }
    } catch (error) {
      logError(error)
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: (error as Error).message });
    }
  }

  async forgetPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const { success, message, token } =
        await this.authService.forget_Password(email);
      console.log(success);
      if (!success) res.status(HttpStatus.UNAUTHORIZED).json({ message });
      else res.status(HttpStatus.OK).json({ message, token });
    } catch (error) {
      logError(error)
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: (error as Error).message });
    }
  }

  async resetOTP(req: Request, res: Response) {
    try {
      const { otp } = req.body;
      const Token = req.headers.authorization as string;
      
      if(otp){
        const { success, message, token } = await this.authService.reset_otp(
          Token,
          otp
        );
        if (!success) {
          res.status(HttpStatus.UNAUTHORIZED).json({ message });
        }else{
          res.status(HttpStatus.OK).json({ message, token });
        }
      }else res.status(HttpStatus.UNAUTHORIZED).json({message :'OTP is required'})      
    } catch (error) {
      logError(error)
      console.log(error, "from reset password");
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message:responseMessage.ERROR_MESSAGE });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { password, newPassword } = req.body;
      const Token = req.headers.authorization as string;
      const { message, success} = await this.authService.reset_Password(
        password,
        newPassword,
        Token
      );
      if (success) {
        res.status(HttpStatus.OK).json({ success :true, message:message,});
      }else{
        res.status(HttpStatus.UNAUTHORIZED).json({ success:false,message:message})
      }
    } catch (error) {
      logError(error)
      console.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: responseMessage.ERROR_MESSAGE });
    }
  }

  async logoutUser(req:AuthRequest,res:Response){
    try {
      res.clearCookie('rftn');
      res.clearCookie('authtkn');
       res.status(HttpStatus.OK).json({message:"loggedOut"})
      //  req.session.destroy((err) => {
      //   if (err) {
      //     console.error('Error during logout:', err);
      //     return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Could not log out');
      //   } }) 
     } catch (error) {
      logError(error)
      console.log((error as Error).message)
      throw new Error('from logout user')
    }
  }

  async setNewToken(req:Request,res:Response){
    logger.debug('entered into set new token')
    const token=req.cookies?.rftn;
    if(!token){
        res.status(HttpStatus.FORBIDDEN).json({message:responseMessage.ERROR_MESSAGE})
        return
    }
    try {
      console.log('232323');
      
      const response= await this.authService.checkToken(token)
      if(response?.success){
        res.json({accessToken:response.accessToken})
        return
      }else{
        res.clearCookie('rftn')
        res.status(HttpStatus.FORBIDDEN).json({message:response?.message})
      }
    } catch (error) {
      logError(error)
        console.log('error in the setnew token',error);
        
    }
}
}

export const authController = Container.get(AuthController);
