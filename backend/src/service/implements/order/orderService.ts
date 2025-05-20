import { OrderRepository } from "@/repositories/implimentation/order/orderRepository";
import { Service } from "typedi";
import { stripeService } from "../stripe/stripeService";
import { auctionRepository } from "@/repositories/implimentation/auction/auctionRepository";
import { logError } from "@/utils/logger_utils";
import { IAuction } from "@/models/auctionModel";
import { paymentRepository } from "@/repositories/implimentation/user/paymentRepository";
import { paymentStatus, paymentType } from "@/models/paymentModel";
import { responseMessage } from "@/enums/http_StatusCode";
import { organizerRepository } from "@/repositories/implimentation/organizerRepository";
import { IOrder } from "@/models/orderModel";

 

 @Service()
export class OrderService{
    constructor(
        private orderRepo : OrderRepository,
        private stripeService : stripeService,
        private auctionRepo : auctionRepository,
        private paymentRepo : paymentRepository,
        private organizerRepo :organizerRepository
    ){}

    async createOrderPayment(data:{price:string,title:string,img:string,id:string,address: string},userId:string){
        try {
            const exists = await this.orderRepo.findByField('auction',data.id)            
            if(exists)return {success:false,message:'Already made the payment'}
            const deductionAmount = await this.auctionRepo.findById(data.id) as IAuction
            const finalPrice = parseInt(data.price) - deductionAmount.entryAmt
            const paymentData = {
                ...data,price:finalPrice
            }
            const session = await this.stripeService.makePaymentSession(paymentData, userId);
            if(session){
                const exist = await this.orderRepo.findByField('auction',data.id)
                if(!exist){
                    await this.orderRepo.create({user:userId,auction:data.id,orderAmt:finalPrice,paymentStatus:'Pending',orderStatus:'Pending',shippingAddress:data.address})
                    await this.paymentRepo.create({transactionId:session.id,amount:finalPrice,paymentType:paymentType.WINNING_BID,userId,auctionId:data.id})
                }
                return { success: true, session }
            }
            else return { success: false, message: "Failed to make payment" };
                                
        } catch (error) {
            logError(error)
            console.log( (error as Error).message);
            return { success: false, message: (error as Error).message };
        }
    }
    async placeOrder(query:{session_id:string,aid:string},userId:string){
        try {
            
            const response = await this.stripeService.payment_Status(query);
            const data = {
                status: response.status,
                customer_email: response.customer_details?.email,
              };              
            if(response.status=='complete'){
                const commitedAuction = await this.auctionRepo.findById(query.aid) as IAuction
                const deductionAmout = commitedAuction?.baseAmount-commitedAuction?.entryAmt
                const updatePaymentStatus = await this.paymentRepo.updatePayment(userId,query.aid,{status:paymentStatus.COMPLETED,amount:deductionAmout})
                await this.auctionRepo.update(query.aid,{isSold:true})
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
            if(response) return { success:true , data:response }
            else return {success:false , message: responseMessage.NOT_FOUND}            
        } catch (error) {
            console.log((error as Error).message);
            return {success:false , message:(error as Error).message }
        }
    }
    async getDispatchOrders(userId:string){
        try {
            const response = await this.orderRepo.getDispatchOrders(userId)
            if(response)return {success:true,data:response}
            else return {success:false,Message:responseMessage.INVALID_REQUEST}
        } catch (error) {
            logError(error)
            return {success:false,Message:responseMessage.ERROR_MESSAGE}
        }
    }
    async changeOrderStatus(data:{value:"Pending" | "Shipped" | "Delivered" | "Canceled" ,order:string}){
        try {
            const response = await this.orderRepo.update(data.order,{orderStatus:data.value})
            if(response)return {success:true}
            else return {success:false}
        } catch (error) {
            logError(error)
            return {success:false,Message:responseMessage.ERROR_MESSAGE}
        }
    }
    async addRating(orderId:string,rating:number,clintId:string){
        try {
            const order = await this.orderRepo.findById(orderId,'auction') as IOrder            
            const response = await this.organizerRepo.addRating( (order.auction as IAuction).seller ,clintId,rating,orderId)                        
            if(response){
                return {  success : true ,message:'Rating updated'}
            }
            else return {success:false , message : 'failed' }
        } catch (error) {  
            logError(error)     
            return {success:false,message:responseMessage.ERROR_MESSAGE}
        }
    }
}