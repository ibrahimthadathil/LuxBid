
import mongoose ,{Schema,Document} from 'mongoose'
export interface IAuction extends Document{
    _id:string,
    title:string,
    description:string,
    product:string,
    bidAmount:number,
    bidders:{
        user:string,
        bidTime:Date,
        isAccept:boolean,
        amount:number
    }[],
    endTime:Date,
    auctionType : 'Live'| 'Scheduled',
    createdAt?:Date,
    isActive :boolean,
    entryAmt:number
}

const auctionSchema = new Schema({
    title:{type:String , required:true},
    description:{type:String,required:true},
    bidAmount:{type:Number,required:true},
    bidders:[{
        user: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
        bidTime:{type:Date},
        amount:{type:Number},
        isAccept:{type:Boolean, default:false},
    }],
    endTime:{type:Date},
    auctionType :{type:String,enum:['Live','Scheduled'],required:true},
    isActive:{type:Boolean},
    entryAmt:{type:Number,required:true}
},{timestamps:true})


export const Auction = mongoose.model<IAuction>('Auction',auctionSchema)