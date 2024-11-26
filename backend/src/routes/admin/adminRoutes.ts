import {Router} from "express";
import { adminController } from "../../controller/implements/admin/adminController";
import {  categoryController } from "../../controller/implements/admin/categoryController";


const adminRoute = Router() 

adminRoute.post('/auth/signin',adminController.adminSignIn.bind(adminController))
adminRoute.get('/users',adminController.fetchUsers.bind(adminController))
adminRoute.put('/updateuser/:id',adminController.updateUser.bind(adminController))
adminRoute.post('/addcategory',categoryController.add_Category.bind(categoryController))
adminRoute.get('/getcategory',categoryController.get_category.bind(categoryController))
adminRoute.get('/findByRole/:role',adminController.fetchUsers.bind(adminController))

export default adminRoute