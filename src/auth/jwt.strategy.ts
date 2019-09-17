import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt, VerifiedCallback} from "passport-jwt";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(private authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            ,
            secretOrKey: 'supersecret'
        });
    }

    async validate(payload:any,done: VerifiedCallback){
        const user = this.authService.validateUser(payload);
        if(!user){
            return done(
                new HttpException('Unauthorized access',HttpStatus.UNAUTHORIZED)
            );
        }
        return done(null,user,payload.iat);
    }
}