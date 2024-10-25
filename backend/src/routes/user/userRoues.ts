import express, { Router } from 'express'
import { userController } from "../../controller/user/userController";

const userRoute = Router()

userRoute.post('/signup',userController.Signup.bind(userController))
userRoute.post('/register',userController.register.bind(userController))
userRoute.post('/otpverify',userController.verifyOTP.bind(userController))
userRoute.post('/signin',userController.signIn.bind(userController))

export default userRoute

