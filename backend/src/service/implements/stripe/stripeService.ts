import { paymentStatus, paymentType } from "@/models/paymentModel";
import { auctionRepository } from "@/repositories/implimentation/auction/auctionRepository";
import { paymentRepository } from "@/repositories/implimentation/user/paymentRepository";
import  { logError } from "@/utils/logger_utils";
import Stripe from "stripe";
import { Service } from "typedi";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-11-20.acacia",
});
@Service()
export class stripeService {
  private stripe: Stripe;
  constructor(
    private auctionRepo: auctionRepository,
    private paymentRepo: paymentRepository
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }

  async  makePaymentSession(data:Record<string,number |string>,userId:string) {
    try {
      const paymentItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: String(data.title),
              images: data.img ? [String(data.img)] : [],
            },
            unit_amount: (data.price as number) * 100,
          },
          // quantity: data.quantity || 1,
          quantity:
          typeof data.quantity === "number"
            ? data.quantity
            : parseInt(String(data.quantity)) || 1,
        }, 
      ];

      const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        line_items: paymentItems,
        mode: "payment",
        return_url: data.address ?`${process.env.SERVER_URL}/return?session_id={CHECKOUT_SESSION_ID}&aid=${data.id}&order=${true}`: `${process.env.SERVER_URL}/return?session_id={CHECKOUT_SESSION_ID}&aid=${data.id}`,
        metadata: {
          aid:String(data.id),
          userId: userId,
        },
      });
      return session;
    } catch (error) {
      console.log("11111", (error as Error).message);
      throw new Error("Failed to create payment session");
    }
  }

  async payment_Status(query: {session_id:string,aid:string}) {
    try {
      const session = await stripe.checkout.sessions.retrieve(query.session_id);
      return session;
    } catch (error) {
      logError(error)
      throw new Error("Failed to complee the payment");
    }
  }

  async handleWebhook(event: Stripe.Event) {
    try {
      switch (event.type) {
        case "checkout.session.completed":{
          const session = event.data.object as Stripe.Checkout.Session;
          await this.handleSuccessfulPayment(session);
          break;}
        case "checkout.session.expired":
          await this.handleFailedPayment(
            event.data.object as Stripe.Checkout.Session
          );
          break;
        case "charge.refunded":
          await this.handleRefundComplete(event.data.object as Stripe.Charge);
          break;
        case "charge.updated": 
        
          break;
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }
      return { success: true };
    } catch (error) {
      logError(error);
      throw error;
    }
  }

  private async handleSuccessfulPayment(session: Stripe.Checkout.Session) {
    try {
      const auctionId = session.metadata?.aid;
      const userId = session.metadata?.userId;
      // const paymentIntentId = session.payment_intent as string;
      if (!auctionId || !userId) {
        throw new Error("Missing metadata in session");
      }

      // Update auction payment status
      await this.auctionRepo.updatePaymentStatus(
        auctionId,
        userId,
        "completed"
      );
        
      // Update payment record
      const f=await this.paymentRepo.updatePaymentStatus(
        session.id,
        {status:paymentStatus.COMPLETED}
      );
      
    } catch (error) {
      logError(error);
      throw error;
    }
  }

  async processAuctionRefunds(auctionId: string, winnerUserId: string) {
    try {
      const payments = await this.paymentRepo.findPendingEntryFees(auctionId);
      const auction = await this.auctionRepo.findById(auctionId);

      if (!auction) throw new Error("Auction not found");

      for (const payment of payments) {
        if (payment.userId.toString() !== winnerUserId) {
          // Process refund for non-winners
          const refund = await this.stripe.refunds.create({
            payment_intent: payment.transactionId,
          });
          // Create refund record
          await this.paymentRepo.create({
            transactionId: refund.id,
            amount: payment.amount,
            paymentType: paymentType.REFUND,
            userId: payment.userId.toString(),
            auctionId: auction._id.toString(),
            auctionTitle: auction.title,
            status: paymentStatus.PENDING,
          });
        }
      }
    } catch (error) {
      logError(error);
      throw error;
    }
  }
  private async handleRefundComplete(charge: Stripe.Charge) {
    try {
      const refundId = charge?.refunds?.data[0].id;
      await this.paymentRepo.updatePaymentStatus(
        refundId as string,
        {status:paymentStatus.REFUNDED}
      );
    } catch (error) {
      logError(error);
      throw error;
    }
  }

  private async handleFailedPayment(session: Stripe.Checkout.Session) {
    try {
      const auctionId = session.metadata?.aid;
      const userId = session.metadata?.userId;

      if (!auctionId || !userId) {
        throw new Error("Missing metadata in session");
      }

      const auction = await this.auctionRepo.findById(auctionId);
      if (!auction) {
        throw new Error("Auction not found");
      }

      const bidderIndex = auction.bidders.findIndex(
        (bidder: {user:string}) => bidder.user.toString() === userId
      );

      if (bidderIndex !== -1) {
        auction.bidders[bidderIndex].paymentStatus = "failed";
        await auction.save();
      }
    } catch (error) {
      logError(error);
      throw error;
    }
  }
}
