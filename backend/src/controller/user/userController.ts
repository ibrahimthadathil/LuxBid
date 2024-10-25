import { Request, Response } from "express";
import { Iuser } from "../../models/userModel";
import { Iopt } from "../../models/otpModel";
import { Container, Service } from "typedi";
import { UserService } from "../../service/userService";

@Service()
class UserController {
  private userservice : UserService

  constructor(){

    this.userservice = Container.get(UserService)
    
  }

  async Signup(req: Request, res: Response) {
    try {
      const userData: Iuser = req.body;
      const { message, token,success } = await this.userservice.createUser( userData.email );
      if ( !token){
         res.status(409).json({ response: message });  
      }else{ 
        res.status(200).json({ token: token, response: message ,success});
      } 
        
    } catch (error) {
      console.log((error as Error).message);
    }
  }

  async verifyOTP(req: Request, res: Response) {
    try {
      const { OTP } = req.body;
      const token = req.headers.authorization as string;
      const response = await this.userservice.verifyotp(OTP, token);
      if (!response.success) res.status(401).json({ message: response.message });
      else
        res
          .status(200)
          .json({ token: response, message: response.message });
    } catch (error) {
      console.log((error as Error).message);
      if ((error as Error).message == "Token verification failed") {
        res.status(401).json({ message: "Invalid token" });
      }
    }
  }

  async register(req: Request, res: Response) {
    try {
      const userDetails: Iuser = req.body;
      const token = req.headers.authorization as string;
      const response = await this.userservice.registerUser(userDetails, token);
      if (response)
        res
          .status(200)
          .json({ token: response.token, message: response.message });
      else res.status(500).json({ message: "couldn't save the user" });
    } catch (error) {
      console.log(error);
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const response = await this.userservice.verifySignIn(email, password);
      if (response?.success) {
        res
          .status(200)
          .json({ token: response.token, status: response.status });
      } else {
        res.status(401).json({ status: response?.status });
      }
    } catch (error) {
      res.status(500).json({ status: (error as Error).message });
    }
  }
}

export const userController = Container.get(UserController)
