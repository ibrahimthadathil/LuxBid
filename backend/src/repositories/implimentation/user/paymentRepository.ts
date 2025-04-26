import { Service } from "typedi";
import { BasRepository } from "../baseRepository";
import { IPayment, Payment, paymentStatus, paymentType } from "@/models/paymentModel";
import { logError } from "@/utils/logger_utils";


@Service()
export class paymentRepository extends BasRepository<IPayment>{

    constructor(){
        super(Payment)
    }

    async updatePaymentStatus(sessionId: string,updateData: Partial<IPayment>): Promise<IPayment | null> {
        try {
          return await Payment.findOneAndUpdate(
            { transactionId: sessionId },
             updateData ,
            { upsert: true ,new:true}
          );
        } catch (error) {
          logError(error);
          throw new Error('Failed to update payment status');
        }
      }

    async getUserTransactionHistory(userId: string) {
        return await Payment.find({ userId })
            .sort({ paymentDate: -1 })
            .populate('auctionId', 'title')
            
    }

    async findPendingEntryFees(auctionId: string) {
        return await Payment.find({
            auctionId,
            paymentType: paymentType.ENTRY_FEE,
            status: paymentStatus.COMPLETED
        });
    }

    async updatePayment(userId:string,auctionId:string,updateData:Partial<IPayment>){
      try {
        const reponse = await Payment.findOneAndUpdate({auctionId,userId},updateData,{upsert:true})
        return reponse 
      } catch (error) {
        logError(error);
          throw new Error('Failed to update payment status ');
      }
    }


}