import  { Router } from 'express'
import { AuthMiddleWare } from '../../middleware/AuthMiddleware';
import { userController } from '../../controller/implements/user/userController';
import { buyer_controller } from '../../controller/implements/user/buyerController';
import { Organizer_Controller } from '../../controller/implements/user/organizerController';
import { upload } from '../../utils/multer_Utils';
import { product_Controller } from '../../controller/implements/product/productController';

const userRoute = Router()

userRoute.get('/user',AuthMiddleWare,userController.find_User.bind(userController))
userRoute.post('/setbuyer',AuthMiddleWare,buyer_controller.set_Buyer.bind(buyer_controller))
userRoute.post('/setseller',AuthMiddleWare,Organizer_Controller.set_Organizer.bind(Organizer_Controller))
userRoute.get('/buyer',AuthMiddleWare,buyer_controller.get_Buyer.bind(buyer_controller))
userRoute.get('/seller',AuthMiddleWare,Organizer_Controller.get_Organizer.bind(Organizer_Controller))
userRoute.post('/uploadprofile',AuthMiddleWare,upload.single('image'),userController.upload_Profile.bind(userController))
userRoute.post('/editprofile',AuthMiddleWare,userController.edit_Profile.bind(userController))

userRoute.post('/addpost',AuthMiddleWare,upload.array('images',5),product_Controller.create_Post.bind(product_Controller))
userRoute.get('/getpost',AuthMiddleWare,product_Controller.get_Post.bind(product_Controller))
userRoute.put('/updatepost/:id',AuthMiddleWare,upload.array('images',5),product_Controller.update_Post.bind(product_Controller))
userRoute.delete('/removepost/:id',AuthMiddleWare,product_Controller.remove_Post.bind(product_Controller))
export default userRoute

