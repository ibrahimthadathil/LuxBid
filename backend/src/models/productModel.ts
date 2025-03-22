import mongoose ,{Schema,Document}from "mongoose";

export interface Iproduct extends Document{
    _id:string,
    seller:string,
    images:string[],
    category:string,
    description:string,
    title:string,
    isApproved:boolean,
    location:string,
    status: 'Pending'|'Approved'|'Rejected'
}

const productSchema = new Schema({
    seller:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    images:[{type:String ,required:true}],
    category:{type:mongoose.Schema.Types.ObjectId , ref :'Category',required:true},
    description:{type:String},
    title:{type:String, required:true},
    isApproved:{type:Boolean , default:false},
    location:{type:String},
    status:{type:String ,enum:['Approved','Rejected','Pending'] ,default:'Pending'},
    isActive:{type:Boolean , default:true}
},{timestamps:true})

export const Product = mongoose.model<Iproduct>('Product',productSchema)