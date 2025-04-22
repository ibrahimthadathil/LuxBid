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
import { AuthMiddleWare } from "./middleware/user/AuthMiddleware";
import { authorizationAccess } from "./middleware/user/AuthorizationMiddleware";
import { OrganizerAuthMiddleware } from "./middleware/user/organizerAuthmiddleware";
import { createServer } from "http";
import "./utils/logger_utils";
import { initializeSocket } from "./config/socketConfig";
import chatRoute from "./routes/chat/chatRoutes";
import addressRoute from "./routes/user/addressRoute";
import orderRoute from "./routes/order/orderRoute";
import helmet from "helmet";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
dotenv.config();
connectDB();

const target = {
  origin: process.env.server_URL,
  changeOrigin: true,
  credentials: true,
};

const app = express();
const httpServer = createServer(app);
initializeSocket(httpServer)

app.use(helmet())
app.use(cors(target));
app.use('/Luxbid/webhook', express.raw({ type: 'application/json' })); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/Luxbid", authRoute);
app.use("/Luxbid", userRoute);
app.use("/Luxbid", auctionRoute);
app.use("/LB/api", adminRoute);
app.use("/Luxbid",chatRoute)
app.use("/LuxBid",addressRoute)
app.use("/LuxBid",orderRoute)
app.use(
  "/Luxbid",
  AuthMiddleWare,
  authorizationAccess,
  OrganizerAuthMiddleware,
  postRoute
)


const PORT = process.env.PORT_NO || 4001;

httpServer.listen(PORT, () => {
  console.log(`backend running at http://localhost:${PORT}`);
});
