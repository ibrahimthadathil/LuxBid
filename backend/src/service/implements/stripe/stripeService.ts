import { Service } from "typedi";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

@Service()
export class stripeService {
  constructor() {}
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
}
