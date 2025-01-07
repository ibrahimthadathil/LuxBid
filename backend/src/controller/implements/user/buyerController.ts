import Container, { Service } from "typedi";
import { buyer_service } from "../../../service/implements/user/buyerService";
import { AuthRequest } from "../../../types/api";
import { Response } from "express";
import { IbuyerContoller } from "../../interface/buyerController";
import { Iuser } from "../../../models/userModel";
import { HttpStatus, responseMessage } from "@/enums/http_StatusCode";
import { logError } from "@/utils/logger_utils";

@Service()
class BuyerController implements IbuyerContoller {
  constructor(private buyerService: buyer_service) {}

  async set_Buyer(req: AuthRequest, res: Response) {
    try {
      const currentUser = req.user;
      if (currentUser) {
        const { success, message } = await this.buyerService.set_Buyer(
          currentUser as string
        );
        if (success) res.status(HttpStatus.OK).json({ success, message });
        else res.status(HttpStatus.UNAUTHORIZED).json({ success, message });
      } else {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ success: false, message: responseMessage.ACCESS_DENIED });
      }
    } catch (error) {
      logError(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: responseMessage.ERROR_MESSAGE });
    }
  }

  async get_Buyer(req: AuthRequest, res: Response) {
    try {
      const buyerId = req.user;
      if (buyerId) {
        const { success, data, message } = await this.buyerService.get_Buyer(
          buyerId as string
        );
        if (success) {
          res
            .status(HttpStatus.OK)
            .json({ success, data, message: "Approved as a Buyer" });
        } else res.status(HttpStatus.FORBIDDEN).json({ message, success });
      } else {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ success: false, message: responseMessage.ACCESS_DENIED });
      }
    } catch (error) {
      logError(error);
      console.log((error as Error).message);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: responseMessage.ERROR_MESSAGE });
    }
  }

  async committed_Auction(req: AuthRequest, res: Response) {
    try {
      const userId = req.user;
      const { success, data, message } =
        await this.buyerService.allCommited_Auction(userId as string);
      if (success) res.status(HttpStatus.OK).json({ success, data });
      else res.status(HttpStatus.NOT_FOUND).json({ success, message });
    } catch (error) {
      logError(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: responseMessage.ERROR_MESSAGE });
    }
  }
}

export const buyer_controller = Container.get(BuyerController);
