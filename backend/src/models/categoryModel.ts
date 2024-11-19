import mongoose, { Document, Schema } from "mongoose";


export interface Icategory extends Document{
    _id:string,
    name:string,
    isActive:boolean,

}

const categorySchema = new Schema({
    name:{ type: String , unique:true,required:true},
    isActive:{type:Boolean , default : true}
})

export const Category = mongoose.model<Icategory>('Category',categorySchema)