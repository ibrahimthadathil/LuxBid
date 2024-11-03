import  { Router } from 'express'
import { userController } from "../../controller/implements/user/userController";

const userRoute = Router()

userRoute.post('/signup',userController.Signup.bind(userController))
userRoute.post('/register',userController.register.bind(userController))
userRoute.post('/otpverify',userController.verifyOTP.bind(userController))
userRoute.post('/signin',userController.signIn.bind(userController))
userRoute.post('/auth/google',userController.googleAuth.bind(userController))
userRoute.post('/forget/password',userController.forgetPassword.bind(userController))
userRoute.post('/reset/otp',userController.resetOTP.bind(userController))
userRoute.post('/reset/password',userController.resetPassword.bind(userController))

export default userRoute

