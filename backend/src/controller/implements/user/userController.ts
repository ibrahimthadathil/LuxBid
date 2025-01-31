import Container, { Service } from "typedi";
import { userService } from "@/service/implements/user/userService";
import { IuserContrller } from "@/controller/interface/userController_Interface";
import { Request, Response } from "express";
import { AuthRequest } from "@/types/api";
import { stripeService } from "@/service/implements/stripe/stripeService";
import Stripe from "stripe";
import { logError } from "@/utils/logger_utils";
import { HttpStatus, responseMessage } from "@/enums/http_StatusCode";


@Service()
class user_Controller implements IuserContrller {
  private stripe: Stripe;
  constructor(
    private userServide: userService,
    private stripeService: stripeService
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  async find_User(req: AuthRequest, res: Response) {
    try {
      const user = req.user;
      const {success,data,message} = await this.userServide.findUser(user as string)
      if (success) {
        res.status(HttpStatus.OK).json({ success: true, data });
      } else res.status(HttpStatus.BAD_REQUEST).json({ success: false, message:responseMessage.ACCESS_DENIED });
    } catch (error) {
      logError(error)
      console.log("from error", (error as Error).message);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: responseMessage.ERROR_MESSAGE});
    }
  }

  async upload_Profile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user;
      if (req.file && userId) {
        const { message, success } = await this.userServide.upload_Profile(
          userId as string,
          req.file
        );
        if (success) res.status(HttpStatus.OK).json({ success, message });
        else res.status(HttpStatus.UNAUTHORIZED).json({ success, message });
      } else
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ success: false, message: responseMessage.UPLOAD_FAILED });
    } catch (error) {
      logError(error)
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: responseMessage.ERROR_MESSAGE });
    }
  }

  async edit_Profile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user;

      if (userId) {
        const { message, success } = await this.userServide.edit_Profile(
          req.body,
          userId as string
        );
        if (success) {
          res.status(HttpStatus.OK).json({ success, message });
        } else res.status(HttpStatus.BAD_REQUEST).json({ message, success });
      } else
        res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: responseMessage.ACCESS_DENIED});
    } catch (error) {
      logError(error)
    }
  }

  async make_Payment(req:AuthRequest,res:Response){        
    try {      
      if(!req.user)res.status(HttpStatus.FORBIDDEN).json({message:responseMessage.LOGIN_REQUIRED,success:false})
      const {success,message,session} =  await this.userServide.auction_JoinPayment(req.body,req.user as string)      
      if(success)res.status(HttpStatus.OK).json({success,clientSecret: session.client_secret})
      else res.status(401).json({success:false , message:responseMessage.ERROR_MESSAGE})
    } catch (error) {
      logError(error)
        console.log('errr from stripe 121212');
        console.log((error as Error).message);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: responseMessage.ERROR_MESSAGE});       
    }
  }
  async payment_Status(req:AuthRequest,res:Response){
    const userId = req.user 
  try {
    const {success,data,message} = await this.userServide.auction_Join(req.query,userId as string)
    if(success)res.status(HttpStatus.OK).json({success,data})
      else res.status(HttpStatus.BAD_REQUEST).json({success,message})
  } catch (error) {
    logError(error)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.ERROR_MESSAGE})
  }
}

async webhook_Handler(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'];

  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error('Missing Stripe webhook secret');
    }

    const event = this.stripe.webhooks.constructEvent(
      req.body,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Log the event for debugging
    console.log('Webhook received:', event.type);

    // Handle the event
    await this.stripeService.handleWebhook(event);

    res.json({ received: true });
  } catch (err) {
    logError(err)
    return res.status(HttpStatus.BAD_REQUEST).send(`Webhook Error: ${(err as Error).message}`);
  }
}

}

export const userController = Container.get(user_Controller);
