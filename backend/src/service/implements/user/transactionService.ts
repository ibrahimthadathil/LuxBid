import { responseMessage } from "@/enums/http_StatusCode";
import { paymentRepository } from "@/repositories/implimentation/user/paymentRepository";
import { logError } from "@/utils/logger_utils";
import { Service } from "typedi";

@Service()
export class transactionService {
  constructor(private transactionRepo: paymentRepository) {}

  async getHistoryByuser(userId: string) {
    try {
      const response = await this.transactionRepo.getUserTransactionHistory(
        userId
      );
      if (response) return { success: true, data: response };
      else throw new Error("failed to fetch the history");
    } catch (error) {
      logError(error);
      return { success: false, message: responseMessage.INTERNAL_ERROR };
    }
  }
}
