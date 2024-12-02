import {Router} from "express";
import { adminController } from "../../controller/implements/admin/adminController";
import {  category_Controller } from "../../controller/implements/admin/categoryController";
import { product_Controller } from "../../controller/implements/product/productController";


const adminRoute = Router() 

adminRoute.post('/auth/signin',adminController.adminSignIn.bind(adminController))
adminRoute.get('/users',adminController.fetchUsers.bind(adminController))
adminRoute.put('/updateuser/:id',adminController.updateUser.bind(adminController))

adminRoute.post('/addcategory',category_Controller.add_Category.bind(category_Controller))
adminRoute.get('/getcategory',category_Controller.get_Category.bind(category_Controller))
adminRoute.delete('/categoryremove/:id',category_Controller.remove_Category.bind(category_Controller))
adminRoute.put('/categoryupdate/:id',category_Controller.update_Category.bind(category_Controller))

adminRoute.get('/findByRole/:role',adminController.fetchUsers.bind(adminController))

adminRoute.get('/products/:status',product_Controller.findAll_Products.bind(product_Controller))
adminRoute.delete('/removepost/:id',product_Controller.remove_Post.bind(product_Controller))
adminRoute.put('/updatepost/:id',product_Controller.update_PostStatus.bind(product_Controller))
adminRoute.put('/rejectpost/:id',product_Controller.reject_Post.bind(product_Controller))

export default adminRoute