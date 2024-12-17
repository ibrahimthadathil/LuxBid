import Container, { Service } from "typedi";
import { userService } from "../../../service/implements/user/userService";
import { IuserContrller } from "../../interface/userController_Interface";
import { Request, Response } from "express";
import { AuthRequest } from "../../../types/api";
import { stripeService } from "../../../service/implements/stripe/stripeService";

@Service()
class user_Controller implements IuserContrller {
  constructor(
    private userServide: userService,
    private stripeService: stripeService
  ) {}
  async find_User(req: AuthRequest, res: Response) {
    try {
      const user = req.user;
      if (user) {
        res.status(200).json({ success: true, data: user });
      } else res.status(401).json({ success: false, message: "un-Authorized" });
    } catch (error) {
      console.log("from error", (error as Error).message);
      res.status(500).json({ message: "Internal Error" });
    }
  }

  async upload_Profile(req: AuthRequest, res: Response) {
    try {
      const currentUser = req.user;
      if (req.file && currentUser) {
        const { message, success } = await this.userServide.upload_Profile(
          currentUser._id as string,
          req.file
        );
        if (success) res.status(200).json({ success, message });
        else res.status(401).json({ success, message });
      } else
        res
          .status(400)
          .json({ success: false, message: "Failed to upload, Try later" });
    } catch (error) {
      console.log("from upload ", error);
      res
        .status(500)
        .json({ success: false, message: "Internal error, Try later" });
    }
  }

  async edit_Profile(req: AuthRequest, res: Response) {
    try {
      const user = req.user;

      if (user) {
        const { message, success } = await this.userServide.edit_Profile(
          req.body,
          user._id as string
        );
        if (success) {
          res.status(200).json({ success, message });
        } else res.status(400).json({ message, success });
      } else
        res.status(200).json({ success: false, message: "Inavlid Access" });
    } catch (error) {}
  }

  async make_Payment(req:AuthRequest,res:Response){        
    try {
      console.log('00000');
      
      if(!req.user)res.status(403).json({message:'Login to Join',success:false})
      const {success,message,session} =  await this.userServide.auction_JoinPayment(req.body)      
      if(success)res.status(200).json({success,clientSecret: session.client_secret})
      else res.status(401).json({success:false , message:'failed to make payment'})
    } catch (error) {
        console.log('errr from stripe 121212');
        console.log((error as Error).message);
        res.status(500).json({ message: "Internal Error,Try later" });       
    }
  }
  async payment_Status(req:AuthRequest,res:Response){
    const user = req.user 
  try {
    const {success,data,message} = await this.userServide.auction_Join(req.query,user?._id as string)
    if(success)res.status(200).json({success,data})
      else res.status(400).json({success,message})
  } catch (error) {
    res.status(500).json({message:'Internal server Error,Try later'})
  }
}
}

export const userController = Container.get(user_Controller);
