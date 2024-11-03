import {Router} from "express";
import { adminController } from "../../controller/implements/admin/adminController";


const adminRoute = Router() 

adminRoute.post('/auth/signin',adminController.adminSignIn.bind(adminController))
adminRoute.get('/users',adminController.fetchUsers.bind(adminController))
adminRoute.put('/updateuser/:id',adminController.updateUser.bind(adminController))

export default adminRoute