import { OrderRepository } from "@/repositories/implimentation/order/orderRepository";
import { Service } from "typedi";
import { stripeService } from "../stripe/stripeService";
import { auctionRepository } from "@/repositories/implimentation/auction/auctionRepository";
import { logError } from "@/utils/logger_utils";
import { IAuction } from "@/models/auctionModel";
import { paymentRepository } from "@/repositories/implimentation/user/paymentRepository";
import { paymentStatus, paymentType } from "@/models/paymentModel";
import { responseMessage } from "@/enums/http_StatusCode";

 

 @Service()
export class OrderService{
    constructor(
        private orderRepo : OrderRepository,
        private stripeService : stripeService,
        private auctionRepo : auctionRepository,
        private paymentRepo : paymentRepository
    ){}

    async createOrderPayment(data:{price:string,title:string,img:string,id:string,address: string},userId:string){
        try {
            const deductionAmount = await this.auctionRepo.findById(data.id) as IAuction
            const finalPrice = parseInt(data.price) - deductionAmount.entryAmt
            const paymentData = {
                ...data,price:finalPrice
            }
            const session = await this.stripeService.makePaymentSession(paymentData, userId);
            if(session){
                const exist = await this.orderRepo.findByField('user',userId)
                if(!exist){
                    await this.orderRepo.create({user:userId,auction:data.id,orderAmt:finalPrice,paymentStatus:'Pending',orderStatus:'Pending',shippingAddress:data.address})
                    await this.paymentRepo.create({transactionId:session.id,amount:finalPrice,paymentType:paymentType.WINNING_BID,userId,auctionId:data.id})
                }
                return { success: true, session }
            }
            else return { success: false, message: "Failed to make payment" };
                                
        } catch (error) {
            logError(error)
            console.log("11111", (error as Error).message);
            return { success: false, message: (error as Error).message };
        }
    }
    async placeOrder(query:any,userId:string){
        try {
            
            const response = await this.stripeService.payment_Status(query);
            const data = {
                status: response.status,
                customer_email: response.customer_details.email,
              };
            if(response.status=='complete'){
                const commitedAuction = await this.auctionRepo.findById(query.aid) as IAuction
                const deductionAmout:number = commitedAuction?.baseAmount-commitedAuction?.entryAmt
                const updatePaymentStatus = await this.paymentRepo.updatePayment(userId,query.aid,{status:paymentStatus.COMPLETED})
                const updateOrder = await this.orderRepo.findByField('auction',query.aid)
                if(updateOrder){
                    await this.orderRepo.update(updateOrder._id as string,{paymentStatus:'Success'})
                    return {success:true,data,message:'Order Placed'} 
                }else throw new Error('Failed to complete payment')
            }else throw new Error("Failed to complete The Order");
             
        } catch (error) {
            console.log((error as Error).message);
            return {success:false , message:(error as Error).message }
        }
    }
    async getAllOrders(userId:string){
        try {
            const response = await this.orderRepo.findOrdersByUser(userId)
            if(response) return {success:true , data:response}
            else return {success:false , message: responseMessage.NOT_FOUND}            
        } catch (error) {
            console.log((error as Error).message);
            return {success:false , message:(error as Error).message }
        }
    }

}