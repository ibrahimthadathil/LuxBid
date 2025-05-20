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
    private userService: userService,
    private stripeService: stripeService
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  async find_User(req: AuthRequest, res: Response) {
    try {
      const user = req.user;
      const {success,data} = await this.userService.findUser(user as string)
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
        const { message, success } = await this.userService.upload_Profile(
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
        const { message, success } = await this.userService.edit_Profile(
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
      const {success,session} =  await this.userService.auction_JoinPayment(req.body,req.user as string)      
      if(success)res.status(HttpStatus.OK).json({success,clientSecret: session?.client_secret})
      else res.status(HttpStatus.UNAUTHORIZED).json({success:false , message:responseMessage.ERROR_MESSAGE})
    } catch (error) {
      logError(error)
        console.log('errr from stripe 121212');
        console.log((error as Error).message);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: responseMessage.ERROR_MESSAGE});       
    }
  }
  async payment_Status(req:AuthRequest,res:Response){
    const userId = req.user 
    const queryParams = req.query as {session_id:string,aid:string}
  try {
    const {success,data,message} = await this.userService.auction_Join(queryParams,userId as string)
    if(success)res.status(HttpStatus.OK).json({success,data})
      else res.status(HttpStatus.BAD_REQUEST).json({success,message})
  } catch (error) {
    logError(error)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.ERROR_MESSAGE})
  }
}

async webhook_Handler(req:Request, res: Response) {
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
      // Handle the webhook event
      await this.stripeService.handleWebhook(event);
      res.json({ received: true });

  } catch (err) {
    logError(err);    
     res.status(HttpStatus.BAD_REQUEST).send(`Webhook Error: ${(err as Error).message}`);
  }
}

}

export const userController = Container.get(user_Controller);
