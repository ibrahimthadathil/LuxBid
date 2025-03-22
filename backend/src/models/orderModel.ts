import mongoose , { Document,Schema } from "mongoose";
import { IAuction } from "./auctionModel";
import { Iuser } from "./userModel";
import { IAddress } from "./addressModel";

export interface IOrder extends Document {
    user: string | Iuser;
    shippingAddress: string | IAddress;
    paymentStatus: 'Success' | 'Failed' | 'Pending';
    orderStatus: 'Pending' | 'Shipped' | 'Delivered' | 'Canceled';
    auction: IAuction|string;
    orderAmt: number;
    createdAt?: Date;
    updatedAt?: Date;
  }

const orderSchema = new Schema({
    user:{type:mongoose.Schema.Types.ObjectId , ref :'User',required:true},
    shippingAddress:{type:mongoose.Schema.Types.ObjectId , ref :'Address',required:true},
    paymentStatus:{ type:String ,enum:['Success','Failed','Pending'],default:'Pending'},
    orderStatus:{type:String,enum:['Pending','Shipped','Deliverd','Canceled'],default:'Pending'},
    auction:{type:mongoose.Schema.Types.ObjectId , ref:'Auction',required:true},
    orderAmt:{type:Number,required:true}
},{timestamps:true})

export const Order = mongoose.model<IOrder>('Order',orderSchema)