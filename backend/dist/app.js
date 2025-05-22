"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const DB_1 = __importDefault(require("./config/DB"));
const userRoues_1 = __importDefault(require("./routes/user/userRoues"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const adminRoutes_1 = __importDefault(require("./routes/admin/adminRoutes"));
const authRoutes_1 = __importDefault(require("./routes/user/authRoutes"));
const postRoutes_1 = __importDefault(require("./routes/post/postRoutes"));
const auctionRoutes_1 = __importDefault(require("./routes/auction/auctionRoutes"));
const AuthMiddleware_1 = require("./middleware/user/AuthMiddleware");
const AuthorizationMiddleware_1 = require("./middleware/user/AuthorizationMiddleware");
const organizerAuthmiddleware_1 = require("./middleware/user/organizerAuthmiddleware");
const http_1 = require("http");
require("./utils/logger_utils");
const socketConfig_1 = require("./config/socketConfig");
const chatRoutes_1 = __importDefault(require("./routes/chat/chatRoutes"));
const addressRoute_1 = __importDefault(require("./routes/user/addressRoute"));
const orderRoute_1 = __importDefault(require("./routes/order/orderRoute"));
const helmet_1 = __importDefault(require("helmet"));
require("module-alias/register");
dotenv_1.default.config();
(0, DB_1.default)();
const target = {
    origin: process.env.SERVER_URL,
    changeOrigin: true,
    credentials: true,
};
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
(0, socketConfig_1.initializeSocket)(httpServer);
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(target));
app.use('/Luxbid/webhook', express_1.default.raw({ type: 'application/json' }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/Luxbid", authRoutes_1.default);
app.use("/Luxbid", userRoues_1.default);
app.use("/Luxbid", auctionRoutes_1.default);
app.use("/LB/api", adminRoutes_1.default);
app.use("/Luxbid", chatRoutes_1.default);
app.use("/LuxBid", addressRoute_1.default);
app.use("/LuxBid", orderRoute_1.default);
app.use("/Luxbid", AuthMiddleware_1.AuthMiddleWare, AuthorizationMiddleware_1.authorizationAccess, organizerAuthmiddleware_1.OrganizerAuthMiddleware, postRoutes_1.default);
const PORT = process.env.PORT_NO || 4001;
httpServer.listen(PORT, () => {
    console.log(`backend running at http://localhost:${PORT}`);
});
