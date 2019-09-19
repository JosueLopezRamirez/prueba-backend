import { Injectable, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt, VerifiedCallback} from "passport-jwt";
import moment from 'moment';

import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    private logger = new Logger('JwtStrategy');

    constructor(private authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            ,
            secretOrKey: process.env.PRIVATE_KEY
        });
    }

    //Validacion del token
    async validate(payload:any,done: VerifiedCallback){
        
        if(moment().unix() > payload.exp){ //Si el token ya expiro
            this.logger.debug('Token expiro');
            return {error: { message: 'El token ha expirado', status: 401, okay: false}}
        }else{
            this.logger.debug('Token aun vigente'); //Si el token sigue vigente
            const user = this.authService.validateUser(payload);
            if(!user){
                return done(
                    new HttpException('Unauthorized access',HttpStatus.UNAUTHORIZED)
                );
            }
            return done(null,user,payload.iat);
        }
    }
}