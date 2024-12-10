
import mongoose ,{Schema,Document} from 'mongoose'
export interface IAuction extends Document{
    _id:string,
    title:string,
    seller:string,
    description:string,
    post:string,
    baseAmount:number,
    bidders:{
        user:string,
        bidTime:Date,
        isAccept:boolean,
        amount:number
    }[],
    endTime:Date,
    startTime:Date,
    auctionType : 'Live'| 'Scheduled',
    createdAt?:Date,
    isActive :boolean,
    entryAmt:number
}

const auctionSchema = new Schema({
    title:{type:String , required:true},
    seller:{type:mongoose.Schema.Types.ObjectId , ref :'Organizer'},
    description:{type:String,required:true},
    baseAmount:{type:Number,required:true},
    post:{type:mongoose.Schema.Types.ObjectId , ref :'Product' ,required :true},
    bidders:[{
        user: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
        bidTime:{type:Date},
        amount:{type:Number},
        isAccept:{type:Boolean, default:false},
    }],
    endTime:{type:Date},
    startTime:{type:Date ,default:Date.now()},
    auctionType :{type:String,enum:['Live','Scheduled'],required:true},
    isActive:{type:Boolean , default:true},
    entryAmt:{type:Number,required:true}
})


export const Auction = mongoose.model<IAuction>('Auction',auctionSchema)