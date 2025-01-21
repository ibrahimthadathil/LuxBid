import { Schema, model, Document } from 'mongoose';
import { Iuser } from './userModel';

interface IPayment extends Document {
  transactionId: string;
  amountPaid: number;
  paymentStatus: 'Pending' | 'Completed' | 'Failed';
  paymentDate: Date;
  bidderId: string | Iuser;
}

const paymentSchema = new Schema<IPayment>({
  transactionId: { type: String, required: true },
  amountPaid: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending',
  },
  paymentDate: { type: Date, default: Date.now },
  bidderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Payment = model<IPayment>('Payment', paymentSchema);

export { Payment, IPayment };
