import { logError } from "@/utils/logger_utils";
import Stripe from "stripe";
import { Service } from "typedi";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

@Service()
export class stripeService {
  private stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!   );
  }
  async makePaymentSession(data:any) {      
    try {
      console.log(data);
      const paymentItems = [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: data.title,
            images: data.img ? [data.img] : [],
          },
          unit_amount: data.price * 100
        },
        quantity: data.quantity || 1
      }]
      console.log('working',paymentItems);
      console.log('yri :- ',`${process.env.SERVER_URL}/return?session_id={CHECKOUT_SESSION_ID}&aid=${data.id}`);
      
      const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        line_items: paymentItems,
        mode: "payment",
        return_url: `${process.env.SERVER_URL}/return?session_id={CHECKOUT_SESSION_ID}&aid=${data.id}`,
        metadata: {
          aid: data.id,  
          userId: data.userId
        }
      });
      console.log('workingstopp');
      return session;
    } catch (error) {
        console.log('11111',(error as Error ).message);
      throw new Error("Failed to create payment session");
    }
  }
  async payment_Status(query:any,userId:string){
    try {
        console.log(query.aid , '@@@@',userId);
        
        const session = await stripe.checkout.sessions.retrieve(query.session_id);
        if(session.complete){
          
        }
        return session
    } catch (error) {
        throw new Error('Failed to complee the payment')
    }
  }
  
  async handleWebhook(event: Stripe.Event) {
    try {
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        await this.handleSuccessfulPayment(session);
      }
      return { success: true };
    } catch (error) {
      logError(error);
      throw error;
    }
  }
  
  private async handleSuccessfulPayment(session: Stripe.Checkout.Session) {
    try {
      const auctionId = session.metadata?.auctionId;
      const userId = session.metadata?.userId;
  
      if (!auctionId || !userId) {
        throw new Error('Missing metadata in session');
      }
  
      // await this.auctionRepo.updatePaymentStatus(
      //   auctionId,
      //   userId,
      //   'completed'
      // );
    } catch (error) {
      logError(error);
      throw error;
    }
  }

}
