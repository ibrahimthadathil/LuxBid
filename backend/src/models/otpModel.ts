import mongoose, { Document, Schema } from "mongoose";

export interface Iopt extends Document{

    email      : string;
    otp        : string;
    createdAt? : Date

}

const OTPSchema = new Schema({

    email      : { type : String , required : true },
    otp        : { type : String , required : true },
    createdAt  : { type : Date , default : Date.now , expires : 90 }

}, { timestamps : true })

export const otpModel = mongoose.model<Iopt>('OTP',OTPSchema) 