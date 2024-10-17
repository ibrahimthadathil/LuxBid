import express, { Router } from 'express'
import { userController } from "../../controller/user/userController";

const userRoute = Router()

userRoute.post('/register',userController.Signup)


export default userRoute

