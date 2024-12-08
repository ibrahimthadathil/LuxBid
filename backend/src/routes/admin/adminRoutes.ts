import {Router} from "express";
import { adminController } from "../../controller/implements/admin/adminController";
import {  category_Controller } from "../../controller/implements/admin/categoryController";
import { product_Controller } from "../../controller/implements/product/productController";
import { AdminMiddleware } from "../../middleware/adminMiddleware";


const adminRoute = Router() 

adminRoute.post('/auth/signin',adminController.adminSignIn.bind(adminController))
// adminRoute.get('/users',AdminMiddleware,adminController.fetchUsers.bind(adminController))
adminRoute.put('/updateuser/:id',AdminMiddleware,adminController.updateUser.bind(adminController))

adminRoute.post('/addcategory',AdminMiddleware,category_Controller.add_Category.bind(category_Controller))
adminRoute.get('/getAllcategory',AdminMiddleware,category_Controller.get_Category.bind(category_Controller))
adminRoute.delete('/categoryremove/:id',AdminMiddleware,category_Controller.remove_Category.bind(category_Controller))
adminRoute.put('/categoryupdate/:id',AdminMiddleware,category_Controller.update_Category.bind(category_Controller))

adminRoute.get('/findByRole/:role',AdminMiddleware,adminController.fetchUsers.bind(adminController))

adminRoute.get('/products/:status',AdminMiddleware,product_Controller.findAll_Products.bind(product_Controller))
adminRoute.delete('/removepost/:id',AdminMiddleware,product_Controller.remove_Post.bind(product_Controller))
adminRoute.put('/updatepost/:id',AdminMiddleware,product_Controller.update_PostStatus.bind(product_Controller))
adminRoute.put('/rejectpost/:id',AdminMiddleware,product_Controller.reject_Post.bind(product_Controller))

adminRoute.post('/adminlogout',adminController.adminLogout.bind(adminController))

export default adminRoute