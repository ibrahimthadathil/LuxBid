import { Router } from "express";
import { authController } from "@/controller/implements/user/authController";
import { apiLimiter } from "@/config/rateLimiter";
const authRoute = Router();

const signInLimiter = apiLimiter(10*60*1000,10)
const signupLimiter = apiLimiter(10*60*1000,10)

authRoute.post("/signup",signupLimiter,authController.Signup.bind(authController));
authRoute.post("/register", authController.register.bind(authController));
authRoute.post("/otpverify", authController.verifyOTP.bind(authController));
authRoute.post("/signin", signInLimiter,authController.signIn.bind(authController));
authRoute.post("/auth/google", authController.googleAuth.bind(authController));
authRoute.post(
  "/forget/password",
  authController.forgetPassword.bind(authController)
);
authRoute.post("/reset/otp", authController.resetOTP.bind(authController));
authRoute.post(
  "/reset/password",
  authController.resetPassword.bind(authController)
);
authRoute.post("/logout", authController.logoutUser.bind(authController));
authRoute.get('/refresh-token',authController.setNewToken.bind(authController))
export default authRoute;
