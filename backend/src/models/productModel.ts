import mongoose ,{Schema,Document}from "mongoose";

export interface Iproduct extends Document{
    _id:string,
    seller:string,
    price:number,
    images:string[],
    category:string,
    description:string,
    title:string,
    isApproved:boolean,
    location:string
}

const productSchema = new Schema({
    seller:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    price:{type:Number,required:true},
    images:[{type:String ,required:true}],
    category:{type:mongoose.Schema.Types.ObjectId , ref :'Category',required:true},
    description:{type:String},
    title:{type:String, required:true},
    isApproved:{type:Boolean , default:false},
    location:{type:String}
})

export const Product = mongoose.model<Iproduct>('Product',productSchema)