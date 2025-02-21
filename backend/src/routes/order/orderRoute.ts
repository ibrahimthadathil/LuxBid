import { order_Contoller } from "@/controller/implements/order/orderControll";
import { AuthMiddleWare } from "@/middleware/user/AuthMiddleware";
import { authorizationAccess } from "@/middleware/user/AuthorizationMiddleware";
import { Router } from "express";

const orderRoute = Router();

orderRoute
  .route("/order-payment")
  .post(
    AuthMiddleWare,
    authorizationAccess,
    order_Contoller.makeOrder.bind(order_Contoller)
  )
  .get(
    AuthMiddleWare,
    authorizationAccess,
    order_Contoller.paymentStatus.bind(order_Contoller)
  );
orderRoute
  .route("/orders")
  .get(
    AuthMiddleWare,
    authorizationAccess,
    order_Contoller.fetchOrders.bind(order_Contoller)
  );
orderRoute
  .route("/place-order")
  .get(
    AuthMiddleWare,
    authorizationAccess,
    order_Contoller.dispatchOrders.bind(order_Contoller)
  )
  .put(AuthMiddleWare, authorizationAccess,order_Contoller.placeOrder.bind(order_Contoller));

export default orderRoute;
