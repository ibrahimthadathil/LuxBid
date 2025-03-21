import { Router } from "express";
import { adminController } from "../../controller/implements/admin/adminController";
import { categoryController } from "../../controller/implements/admin/categoryController";
import { productController } from "../../controller/implements/product/productController";
import { AdminMiddleware } from "../../middleware/adminMiddleware";
import { auctionController } from "../../controller/implements/auction/auctionController";

const adminRoute = Router();

// Admin authentication
adminRoute
  .post("/auth/signin", adminController.adminSignIn.bind(adminController))
  .post("/auth/logout", adminController.adminLogout.bind(adminController));

// User management
adminRoute
  .put("/users/:id", AdminMiddleware, adminController.updateUser.bind(adminController))
  .get("/users/role/:role", AdminMiddleware, adminController.fetchUsers.bind(adminController));

// Category management
adminRoute
  .post("/categories", AdminMiddleware, categoryController.addCategory.bind(categoryController))
  .get("/categories", AdminMiddleware, categoryController.getCategory.bind(categoryController))
  .delete("/categories/:id", AdminMiddleware, categoryController.removeCategory.bind(categoryController))
  .put("/categories/:id", AdminMiddleware, categoryController.updateCategory.bind(categoryController));

// Product (post) management
adminRoute
  .get("/products/status/:status", AdminMiddleware, productController.findAllProducts.bind(productController))
  .delete("/products/:id", AdminMiddleware, productController.removePost.bind(productController))
  .put("/products/:id/status", AdminMiddleware, productController.updatePostStatus.bind(productController))
  .put("/products/:id/reject", AdminMiddleware, productController.rejectPost.bind(productController));

// Auction management
adminRoute.get("/auctions/type/:type", auctionController.listByType.bind(auctionController));

export default adminRoute;
