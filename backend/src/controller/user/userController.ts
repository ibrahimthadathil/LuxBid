import { Request, Response } from "express";
import { Iuser } from "../../models/userModel";
import { Iopt } from "../../models/otpModel";
import { Container, Service } from "typedi";
import { UserService } from "../../service/userService";

@Service()
class UserController {
  private userservice: UserService;

  constructor() {
    this.userservice = Container.get(UserService);
  }

  async Signup(req: Request, res: Response) {
    try {
      const userData: Iuser = req.body;
      const { message, token, success } = await this.userservice.createUser(
        userData.email
      );
      if (!token&&!success) {

        res.status(409).json({ response: message });
      } else {
        res.status(200).json({ token: token, response: message, success });
      }
    } catch (error) {
      console.log((error as Error).message);
      res.status(500).json({ response: 'Internal server error', error: (error as Error).message });

    }
  }

  async verifyOTP(req: Request, res: Response) {
    try {
      const { otp } = req.body;
      const token = req.headers.authorization as string;
      const response = await this.userservice.verifyotp(otp, token);
      if (!response.success)
        res.status(401).json({ message: response.message });
      else res.status(200).json({success:true, token: response.token, message: response.message });
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
      if (response.success){
        res
          .status(200)
          .json({ token: response.token, message: response.message });
      }else {
        res.status(500).json({ message: response.message });}
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

  async googleAuth(req: Request, res: Response) {
    const userDetails: Iuser = req.body;
    try {
      const { success, message, token } = await this.userservice.verifyGoogle(
        userDetails
      );
      if (success) {
        res.status(200).json({ AccessToken: token, message: message });
      }
      res.status(500).json({ message: message });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async forgetPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const { success, message, token } =
        await this.userservice.forget_Password(email);
      if (!success) res.status(500).json({ message });
      res.status(200).json({ message, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async resetOTP(req: Request, res: Response) {
    try {
      const { otp } = req.body;
      const Token = req.headers.authorization as string;
      const { success, message, token } = await this.userservice.reset_otp(
        Token,
        otp
      );
      if (!success) {
        res.status(401).json({ message });
      }
      res.status(200).json({ message, token });
    } catch (error) {
      console.log(error, "from reset password");
      res.status(500).json({ message: "server error , try after some time" });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      
      
      const { password, confirmPassword } = req.body;
      const Token = req.headers.authorization as string
      if (password !== confirmPassword) {
        res.status(401).json({ message: "password is not same" });
        return;
      }
       const {message,success,token} =  await this.userservice.reset_Password(password,Token);
      if(success){
        res.status(200).json({})
      }
      
      
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, try again later' });
    }
  }
}

export const userController = Container.get(UserController);
