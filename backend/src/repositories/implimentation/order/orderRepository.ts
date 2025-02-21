import { Service } from "typedi";
import { BasRepository } from "../baseRepository";
import { IOrder, Order } from "@/models/orderModel";
import { logError } from "@/utils/logger_utils";

@Service()
export class OrderRepository extends BasRepository<IOrder>{

    constructor(){
        super(Order)
    }

    async findOrdersByUser (userId:string){
        try {
            return await Order.find({user:userId}).populate('shippingAddress').populate({path:'auction',populate:{path:'post'}})
        } catch (error) {
            logError(error)
            throw new Error('from order repository');
            
        }
    }

    async getDispatchOrders(sellerId:string){
        try {
           return await Order.find()
            .populate({
                path: 'auction',
                match: { seller: sellerId },
                populate:{path:'post'}
            })
            .populate('shippingAddress')
            
        } catch (error) {
            console.log('ooo');
            logError(error)
            
        }
    }
    
}