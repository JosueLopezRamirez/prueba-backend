import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../mapping/users/user.service';
import { User } from '../mapping/users/user.entity';

import moment from 'moment';
import * as bcrypt from 'bcryptjs';
import { signInDto } from './input/signIn.dto';
import { UserDto } from '../mapping/users/user.dto';
import { SignInResponse } from './dto/auth.dto';
import { ErrorResponse, ResponseSignIn } from '../global.dto';

@Injectable()
export class AuthService {

    private logger = new Logger('AuthService');

    //Dependencies Injection from constructor in AuthService
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    //Validate data of user
    private async validate(sign: signInDto): Promise<User> {
        const result = await this.userService.findByEmail(sign.email);
        if(result !== undefined){
            return result;
        }else{
            return undefined;
            // throw new AuthenticationError('You must be logged in');
        }
    }

    //Validate info from login from user
    public async login(sign: signInDto): Promise<ResponseSignIn> {
        return this.validate(sign).then(async (result) => {
            if(result == undefined){
                return new ResponseSignIn(null,new ErrorResponse('The email or password is incorrect',400,false));
            }else{
                
                if (!bcrypt.compareSync(sign.password, result.password)) {
                    return new ResponseSignIn(null,new ErrorResponse('The email or password is incorrect',400,false));
                }
                return new ResponseSignIn(new SignInResponse(
                    await this.tokenGenerated(result),result.firstname,
                    result.lastname,result.user,
                    result.email,result.phone
                ),null);
            }
        });
    }
    
    public async register(user: UserDto): Promise<ResponseSignIn> {
        let result;
        try {
            result = await this.userService.create(user);
            return new ResponseSignIn(new SignInResponse(
                await this.tokenGenerated(result),result.firstname,
                result.lastname,result.user,
                result.email,result.phone
            ),null);
        } catch (error) {
            return new ResponseSignIn(null,new ErrorResponse('Error to create a user or user already exist!',400,false)); 
        }
    }
    
    //Probando la validacion de las rutas
    async validateUser(payload: any){
        return await this.userService.findByPayload(payload);
    }

    async tokenGenerated(newUser: User) {
        const payload = {
          sub: newUser.id,
          exp: moment().add(15, 'days').unix(),
          iat: moment().unix()
        }
        return await this.jwtService.sign(payload);
    }
}

// 1957