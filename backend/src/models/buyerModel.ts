import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { Iuser } from "./userModel";

export interface IBuyer extends Document{
    _id : ObjectId ,
    user :string |Iuser,
    CommittedBids:[{
        Auction:string,
        bidAmt :number,
        bidDate:Date ,
        bisStatus: string ,
    }],
}

const BuyerSchema = new Schema({
    user:{type : mongoose.Schema.Types.ObjectId , ref : 'User',required:true} ,
    committedBids : [
        {
            Auction : {type:mongoose.Schema.Types.ObjectId ,ref :'Auction'} ,
            bidAmt : { type : Number },
            bideDate:{type:Date ,default:new Date()} ,
            bidStatus:{ type :String , enum:['WIN','LOST',]}
        }
    ]
})

export const Buyer = mongoose.model<IBuyer>('Buyer',BuyerSchema)