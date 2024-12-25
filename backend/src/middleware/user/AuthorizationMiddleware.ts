import { HttpStatus } from "@/enums/http_StatusCode";
import { User } from "@/models/userModel";
import { AuthRequest } from "@/types/api";
import { logError } from "@/utils/logger_utils";
import { NextFunction, Response } from "express";

export const authorizationAccess = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user;
    const currentuser = await User.findById(userId, "-password");
    if (currentuser?.isActive) next();
    else {
      res.clearCookie("rftn");
      res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "Blocked by the Authority" });
    }
  } catch (error) {
    logError(error)
  }
};
