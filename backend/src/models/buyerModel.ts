import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { Iuser } from "./userModel";

export interface IBuyer extends Document{
    _id : ObjectId ,
    user :string | Iuser,
    committedBids:[{
        auction:string,
        bidAmt :number,
        bidDate:Date ,
        bisStatus: 'WIN'|'LOST'|'ON-AIR' ,
    }],
}

const BuyerSchema = new Schema({
    user:{type : mongoose.Schema.Types.ObjectId , ref : 'User',required:true} ,
    committedBids : [
        {
            auction : {type:mongoose.Schema.Types.ObjectId ,ref :'Auction'} ,
            bidAmt : { type : Number },
            bideDate:{type:Date ,default: Date.now()} ,
            bidStatus:{ type :String , enum:['WIN','LOST'],default:'ON-AIR'}
        }
    ]
})

export const Buyer = mongoose.model<IBuyer>('Buyer',BuyerSchema)