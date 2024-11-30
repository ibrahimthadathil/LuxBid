import { JwtPayload } from "jsonwebtoken";

export interface IOtpService {
    createOTP(email: string): Promise<string>;
    verifyOTP(email: string, otp: string): Promise<boolean>;
}

export interface IEmailService {
    sendOtpEmail(email: string, OTP: string, subject: string): Promise<void>;
}

export interface ITokenService {
    generate_AccessToken(payload: JwtPayload): string;
    generate_RefreshToken(payload: JwtPayload): string;
    verify_Token(token: string): JwtPayload;
}