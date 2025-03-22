import { Router } from "express";
import { authController } from "@/controller/implements/user/authController";
const authRoute = Router();

authRoute.post("/signup", authController.Signup.bind(authController));
authRoute.post("/register", authController.register.bind(authController));
authRoute.post("/otpverify", authController.verifyOTP.bind(authController));
authRoute.post("/signin", authController.signIn.bind(authController));
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
