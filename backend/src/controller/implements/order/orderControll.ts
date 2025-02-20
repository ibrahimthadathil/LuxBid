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
            if(success)res.status(HttpStatus.OK).json({success,clientSecret: session?.client_secret})
            else res.status(401).json({success:false , message:responseMessage.ERROR_MESSAGE})    
        } catch (error) {
            logError(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: responseMessage.ERROR_MESSAGE});
        }
    }
    async paymentStatus(req: AuthRequest, res: Response){
        try {
            const userId = req.user as string
            const {success, data,message} = await this.orderService.placeOrder(req.query,userId)
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
}

export const order_Contoller = Container.get(orderController)