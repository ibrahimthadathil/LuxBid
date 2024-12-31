import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/DB";
import userRoute from "./routes/user/userRoues";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRoute from "./routes/admin/adminRoutes";
import authRoute from "./routes/user/authRoutes";
import postRoute from "./routes/post/postRoutes";
import auctionRoute from "./routes/auction/auctionRoutes";
import session from "express-session";
import { sessionConfig } from "./utils/session_utils";
import { AuthMiddleWare } from "./middleware/user/AuthMiddleware";
import { authorizationAccess } from "./middleware/user/AuthorizationMiddleware";
import { OrganizerAuthMiddleware } from "./middleware/user/organizerAuthmiddleware";
import { createServer } from "http";
import { SocketService } from "@/service/implements/socket/socket_Service";
import "./utils/logger_utils";
import Container from "typedi";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
dotenv.config();
connectDB();

const target = {
  origin: process.env.server_URL, // 5001
  changeOrigin: true,
  credentials: true,
};

const app = express();
const httpServer = createServer(app);
const socketService = Container.get(SocketService);
socketService.initialize(httpServer);
app.use(cors(target));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(sessionConfig));
app.use("/Luxbid", authRoute);
app.use("/Luxbid", userRoute);
app.use("/Luxbid", auctionRoute);
app.use("/LB/api", adminRoute);
app.use(
  "/Luxbid",
  AuthMiddleWare,
  authorizationAccess,
  OrganizerAuthMiddleware,
  postRoute
);
// app.get("/h", (req, res) => {
//   res
//     .cookie("jj", "aggahgahg", {
//         httpOnly: true,
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//         secure:true,
//         sameSite:"none"
//     })
//     res.json({ ww: "ahhaha" });
// });

const PORT = process.env.PORT_NO || 4001;

httpServer.listen(PORT, () => {
  console.log(`backend running at http://localhost:${PORT}`);
});
