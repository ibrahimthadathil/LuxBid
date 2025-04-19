import { address_Controller } from "@/controller/implements/user/addressController";
import { AuthMiddleWare } from "@/middleware/user/AuthMiddleware";
import { Router } from "express";

const addressRoute = Router();

addressRoute
  .route("/address")
  .get(AuthMiddleWare,address_Controller.fetchAddress.bind(address_Controller))
  .post(AuthMiddleWare,address_Controller.createAddress.bind(address_Controller))
addressRoute
  .route('/address/:id')  
  .delete(AuthMiddleWare,address_Controller.deleteAddress.bind(address_Controller))



  export default addressRoute