"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addressController_1 = require("@/controller/implements/user/addressController");
const AuthMiddleware_1 = require("@/middleware/user/AuthMiddleware");
const express_1 = require("express");
const addressRoute = (0, express_1.Router)();
addressRoute
    .route("/address")
    .get(AuthMiddleware_1.AuthMiddleWare, addressController_1.address_Controller.fetchAddress.bind(addressController_1.address_Controller))
    .post(AuthMiddleware_1.AuthMiddleWare, addressController_1.address_Controller.createAddress.bind(addressController_1.address_Controller));
addressRoute
    .route('/address/:id')
    .delete(AuthMiddleware_1.AuthMiddleWare, addressController_1.address_Controller.deleteAddress.bind(addressController_1.address_Controller));
exports.default = addressRoute;
