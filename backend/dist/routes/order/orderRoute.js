"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderControll_1 = require("@/controller/implements/order/orderControll");
const AuthMiddleware_1 = require("@/middleware/user/AuthMiddleware");
const AuthorizationMiddleware_1 = require("@/middleware/user/AuthorizationMiddleware");
const express_1 = require("express");
const orderRoute = (0, express_1.Router)();
orderRoute
    .route("/order-payment")
    .post(AuthMiddleware_1.AuthMiddleWare, AuthorizationMiddleware_1.authorizationAccess, orderControll_1.order_Contoller.makeOrder.bind(orderControll_1.order_Contoller))
    .get(AuthMiddleware_1.AuthMiddleWare, AuthorizationMiddleware_1.authorizationAccess, orderControll_1.order_Contoller.paymentStatus.bind(orderControll_1.order_Contoller));
orderRoute
    .route("/orders")
    .get(AuthMiddleware_1.AuthMiddleWare, AuthorizationMiddleware_1.authorizationAccess, orderControll_1.order_Contoller.fetchOrders.bind(orderControll_1.order_Contoller));
orderRoute
    .route("/place-order")
    .get(AuthMiddleware_1.AuthMiddleWare, AuthorizationMiddleware_1.authorizationAccess, orderControll_1.order_Contoller.dispatchOrders.bind(orderControll_1.order_Contoller))
    .put(AuthMiddleware_1.AuthMiddleWare, AuthorizationMiddleware_1.authorizationAccess, orderControll_1.order_Contoller.placeOrder.bind(orderControll_1.order_Contoller));
orderRoute.route('/rating').post(AuthMiddleware_1.AuthMiddleWare, AuthorizationMiddleware_1.authorizationAccess, orderControll_1.order_Contoller.rateSeller.bind(orderControll_1.order_Contoller));
exports.default = orderRoute;
