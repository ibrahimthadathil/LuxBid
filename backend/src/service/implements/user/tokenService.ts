import { JwtPayload } from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../../../utils/jwt_util";
import { Service } from "typedi";
import { ITokenService } from "../../interface/service_Interface";

@Service()
export class tokenService implements ITokenService{

    generate_AccessToken(payload:JwtPayload){
        return generateAccessToken(payload)
    }

    generate_RefreshToken(payload:JwtPayload){
        return generateRefreshToken(payload)
    }

    verify_Token(token:string):JwtPayload{
        return verifyToken(token) as JwtPayload
    }
    
}