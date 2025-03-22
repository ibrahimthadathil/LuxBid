import { HttpStatus, responseMessage } from "@/enums/http_StatusCode";
import { OrderService } from "@/service/implements/order/orderService";
import { AuthRequest } from "@/types/api";
import { logError } from "@/utils/logger_utils";
import { Response } from "express";
import Container, { Service } from "typedi";


@Service()
export class orderController{
    constructor(
        private orderService : OrderService
    ){}
    async makeOrder(req: AuthRequest, res: Response) {
        try {
            const { price, title, img, id, address } = req.body;
            const userId = req.user as string
            const {session,success,message} = await this.orderService.createOrderPayment({ price,title,img,id,address}, userId);
            console.log(success,message,'😶‍🌫️😶‍🌫️');
            if(success)res.status(HttpStatus.OK).json({success,clientSecret: session?.client_secret})
            else res.status(HttpStatus.BAD_REQUEST).json({success:false , message:message})    
        } catch (error) {
            logError(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: responseMessage.ERROR_MESSAGE});
        }
    }
    async paymentStatus(req: AuthRequest, res: Response){
        try {
            const userId = req.user as string
            const queryParams = req.query as { session_id: string; aid: string };
            const { success, data, message } = await this.orderService.placeOrder(queryParams, userId);
            if(success)res.status(HttpStatus.OK).json({success,data,message})
            else res.status(HttpStatus.BAD_REQUEST).json({success,message})
        } catch (error) {
            logError(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.ERROR_MESSAGE})
        }
    }
    async fetchOrders(req:AuthRequest,res:Response){
        try {
          const userId = req.user as string
          const {success,data,message} =await this.orderService.getAllOrders(userId)
          if(success)res.status(HttpStatus.OK).json({success,data})
            else res.status(HttpStatus.BAD_REQUEST).json({success,message})
        } catch (error) { 
            logError(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.ERROR_MESSAGE}) 
        }
    }
    async dispatchOrders(req:AuthRequest,res:Response){
        try {
            const {success,Message,data} = await this.orderService.getDispatchOrders(req.user as string)
            if(success)res.status(HttpStatus.OK).json({data,success})
            else res.status(HttpStatus.SERVICE_UNAVAILABLE).json({success,message:responseMessage.NOT_FOUND})
        } catch (error) {
            logError(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.ERROR_MESSAGE}) 
        }
    }
    async placeOrder(req:AuthRequest,res:Response){
        try {
            const {success,Message} =await this.orderService.changeOrderStatus(req.body)
            if(success)res.status(HttpStatus.OK).json({success,message:`order has been ${req.body.value}`})
            else res.status(HttpStatus.UNAUTHORIZED).json({message:responseMessage.ERROR_MESSAGE})
        } catch (error) {
            
            logError(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.ERROR_MESSAGE}) 
        }
    }
    async rateSeller(req:AuthRequest,res:Response){
        try {
            const { orderId , rating } = req.body
            const {success,message} = await this.orderService.addRating( orderId , rating , req.user as string )
            if(success) res.status(HttpStatus.OK).json({success,message}) 
            else res.status(HttpStatus.UNAUTHORIZED).json({success,message})
        } catch (error) {
            logError(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.ERROR_MESSAGE}) 
        }
    }
}

export const order_Contoller = Container.get(orderController)