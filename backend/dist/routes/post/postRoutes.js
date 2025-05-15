"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthMiddleware_1 = require("@/middleware/user/AuthMiddleware");
const categoryController_1 = require("@/controller/implements/admin/categoryController");
const multer_Utils_1 = require("@/utils/multer_Utils");
const productController_1 = require("@/controller/implements/product/productController");
const postRoute = (0, express_1.Router)();
// find Category
postRoute.get('/findcategory', categoryController_1.categoryController.get_ListedCategory.bind(categoryController_1.categoryController));
//post
postRoute.post('/addpost', AuthMiddleware_1.AuthMiddleWare, multer_Utils_1.upload.array('images', 5), productController_1.productController.create_Post.bind(productController_1.productController));
postRoute.get('/getpost', productController_1.productController.get_Post.bind(productController_1.productController));
postRoute.put('/updatepost/:id', multer_Utils_1.upload.array('images', 5), productController_1.productController.update_Post.bind(productController_1.productController));
postRoute.delete('/removepost/:id', productController_1.productController.remove_Post.bind(productController_1.productController));
postRoute.get('/approvedpost', productController_1.productController.approved_Post.bind(productController_1.productController));
exports.default = postRoute;
