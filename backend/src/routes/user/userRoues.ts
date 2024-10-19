import express, { Router } from 'express'
import { userController } from "../../controller/user/userController";

const userRoute = Router()

userRoute.post('/signup',userController.Signup)
userRoute.post('/otpverify',userController.verifyOTP)
userRoute.post('/register',userController.register)
userRoute.post('/signin',userController.signIn)

export default userRoute

