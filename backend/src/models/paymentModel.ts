import { Schema, model, Document, ObjectId } from 'mongoose';
import { Iuser } from './userModel';

export enum paymentType{
  ENTRY_FEE = 'ENTRY_FEE',
  REFUND = 'REFUND',
  WINNING_BID = 'WINNING_BID'
}

export enum paymentStatus{
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

interface IPayment extends Document {
  transactionId: string;
  amount: number;
  paymentType: paymentType;
  status: paymentStatus;
  paymentDate: Date;
  userId: string | Iuser;
  auctionId: string | ObjectId;
  auctionTitle: string;
}

const paymentSchema = new Schema<IPayment>({
  transactionId: { type: String,  },
  amount: { type: Number, required: true },
  paymentType: {
    type: String,
    enum: Object.values(paymentType),
    required: true
  },
  status: {
    type: String,
    enum: Object.values(paymentStatus),
    default: paymentStatus.PENDING
  },
  paymentDate: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  auctionId : { type: Schema.Types.ObjectId , ref: 'Auction', required: true },

});


const Payment = model<IPayment>('Payment', paymentSchema);

export { Payment, IPayment };
