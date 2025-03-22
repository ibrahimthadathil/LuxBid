import { IPayment, paymentStatus } from "@/models/paymentModel";

interface IPaymentRepository {
    create(payment: Partial<IPayment>): Promise<IPayment>;
    updatePaymentStatus(sessionId: string, status: paymentStatus): Promise<IPayment | null>;
    getUserTransactionHistory(userId: string): Promise<IPayment[]>;
    findPendingEntryFees(auctionId: string): Promise<IPayment[]>;
  }