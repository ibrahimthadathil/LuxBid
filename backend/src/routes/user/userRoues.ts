import  { Router } from 'express'
import { AuthMiddleWare } from '../../middleware/AuthMiddleware';
import { userController } from '../../controller/implements/user/userController';
import { buyer_controller } from '../../controller/implements/user/buyerController';
import { Organizer_Controller } from '../../controller/implements/user/organizerController';
import { upload } from '../../utils/multer_Utils';
import { product_Controller } from '../../controller/implements/product/productController';

const userRoute = Router()

userRoute.get('/user',AuthMiddleWare,userController.findUser.bind(userController))
userRoute.post('/setbuyer',AuthMiddleWare,buyer_controller.setBuyer.bind(buyer_controller))
userRoute.post('/setseller',AuthMiddleWare,Organizer_Controller.setOrganizer.bind(Organizer_Controller))
userRoute.get('/buyer',AuthMiddleWare,buyer_controller.getBuyer.bind(buyer_controller))
userRoute.get('/seller',AuthMiddleWare,Organizer_Controller.getSeller.bind(Organizer_Controller))
userRoute.post('/uploadprofile',AuthMiddleWare,upload.single('image'),userController.uploadProfile.bind(userController))
userRoute.post('/editprofile',AuthMiddleWare,userController.editProfile.bind(userController))
userRoute.post('/addpost',AuthMiddleWare,upload.array('images',5),product_Controller.create_Post.bind(product_Controller))
export default userRoute

