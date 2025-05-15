"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTPMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendOTPMail = (email, matter, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.PASSWORD_USER,
        }
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Email to Complete The process on LuxBid',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: white; background-color: #5B4BAE; padding: 10px; text-align: center;">
        Welcome to LuxBid!
        </h1>
        <p style="font-size: 16px;">
          Please enter the OTP to verify your email and complete your process of <strong>${matter}</strong>:
        </p>
        <div style="text-align: center;">
         <h3 style=" padding: 25px; display: inline-block; border: 2px solid #5B4BAE; border-radius: 8px;">
        Verification: ${otp}
        </h3>
        <p style="color:#f8b878">expires after 90 sec</p>
        </div>
        <p style="font-size: 14px;">Thank you for joining us!</p>
        <p style="font-size: 14px;">
        Best regards,<br>LuxBid Team
        </p>
        </div> `
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Error sending mail :- ", error.message);
        }
        else {
            console.log("Email has been sended :- ", info.response);
        }
    });
});
exports.sendOTPMail = sendOTPMail;
