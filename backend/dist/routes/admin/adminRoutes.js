"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../../controller/implements/admin/adminController");
const categoryController_1 = require("../../controller/implements/admin/categoryController");
const productController_1 = require("../../controller/implements/product/productController");
const adminMiddleware_1 = require("../../middleware/adminMiddleware");
const auctionController_1 = require("../../controller/implements/auction/auctionController");
const dashboardController_1 = require("@/controller/implements/admin/dashboardController");
const adminRoute = (0, express_1.Router)();
// Admin authentication
adminRoute
    .post("/auth/signin", adminController_1.adminController.adminSignIn.bind(adminController_1.adminController))
    .post("/auth/logout", adminController_1.adminController.adminLogout.bind(adminController_1.adminController));
// User management
adminRoute
    .put("/users/:id", adminMiddleware_1.AdminMiddleware, adminController_1.adminController.updateUser.bind(adminController_1.adminController))
    .get("/users/role/:role", adminMiddleware_1.AdminMiddleware, adminController_1.adminController.fetchUsers.bind(adminController_1.adminController));
// Category management
adminRoute
    .post("/categories", adminMiddleware_1.AdminMiddleware, categoryController_1.categoryController.addCategory.bind(categoryController_1.categoryController))
    .get("/categories", adminMiddleware_1.AdminMiddleware, categoryController_1.categoryController.getCategory.bind(categoryController_1.categoryController))
    .delete("/categories/:id", adminMiddleware_1.AdminMiddleware, categoryController_1.categoryController.removeCategory.bind(categoryController_1.categoryController))
    .put("/categories/:id", adminMiddleware_1.AdminMiddleware, categoryController_1.categoryController.updateCategory.bind(categoryController_1.categoryController));
// Product (post) management
adminRoute
    .get("/products/status/:status", adminMiddleware_1.AdminMiddleware, productController_1.productController.findAllProducts.bind(productController_1.productController))
    .delete("/products/:id", adminMiddleware_1.AdminMiddleware, productController_1.productController.remove_Post.bind(productController_1.productController))
    .put("/products/:id/status", adminMiddleware_1.AdminMiddleware, productController_1.productController.updatePostStatus.bind(productController_1.productController))
    .put("/products/:id/reject", adminMiddleware_1.AdminMiddleware, productController_1.productController.rejectPost.bind(productController_1.productController));
// Auction management
adminRoute.get("/auctions/type/:type", auctionController_1.auctionController.listByType.bind(auctionController_1.auctionController));
// Dashboard 
adminRoute.get("/dashboard", adminMiddleware_1.AdminMiddleware, dashboardController_1.dashboardController.dashboard.bind(dashboardController_1.dashboardController));
exports.default = adminRoute;
