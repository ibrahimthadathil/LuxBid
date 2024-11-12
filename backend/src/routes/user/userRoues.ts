import  { Router } from 'express'
import { authController } from "../../controller/implements/user/authController";
import { AuthMiddleWare } from '../../middleware/AuthMiddleware';
import { userController } from '../../controller/implements/user/userController';
import { buyer_controller } from '../../controller/implements/user/buyerController';

const userRoute = Router()
userRoute.post('/signup',authController.Signup.bind(authController))
userRoute.post('/register',authController.register.bind(authController))
userRoute.post('/otpverify',authController.verifyOTP.bind(authController))
userRoute.post('/signin',authController.signIn.bind(authController))
userRoute.post('/auth/google',authController.googleAuth.bind(authController))
userRoute.post('/forget/password',authController.forgetPassword.bind(authController))
userRoute.post('/reset/otp',authController.resetOTP.bind(authController))
userRoute.post('/reset/password',authController.resetPassword.bind(authController))

userRoute.get('/user',AuthMiddleWare,userController.findUser.bind(userController))
userRoute.post('/setbuyer',AuthMiddleWare,buyer_controller.setBuyer.bind(buyer_controller))

export default userRoute

