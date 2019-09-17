import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { User } from '../users/user.entity';

import moment from 'moment';
import * as bcrypt from 'bcryptjs';
import { signInDto } from './dto/signIn.dto';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {

    private logger = new Logger('AuthService');

    //Dependencies Injection from constructor in AuthService
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    //Validate data of user
    private async validate(sign: signInDto): Promise<User> {
        return await this.userService.findByEmail(sign.email);
    }

    //Validate info from login from user
    public async login(sign: signInDto): Promise<any | { status: number }> {
        return this.validate(sign).then(async (result) => {
            console.log(result)
            if (!result) {
                return {
                    data: { error: { message: 'The email or password is incorrect', status: 200, ok: false }}
                }
            }
            
            if (!bcrypt.compareSync(sign.password, result.password)) {
                return {
                    data: { error: { message: 'The email or password is incorrect', status: 200, ok: false }}
                }
            }
            return {
                data: {
                    message: 'User logged in correctly',
                    status: 200,
                    ok: true, 
                    error: [],
                    data: {
                        token: await this.tokenGenerated(result),
                        name: result.firstname,
                        lastname: result.lastname,
                        username: result.user,
                        email:result.email,
                        country: result.country,
                        phone_number: result.phone
                    }
                }
            }
        });
    }
    
    public async register(user: UserDto): Promise<any> {
        user.password = await bcrypt.hash(user.password, 10);
        const result = await this.userService.create(user);
        if(result){
            this.logger.debug(`Usuario registrado con exito ${result}`)
            return {
                data: {
                    message: 'User register correctly',
                    status: 200,
                    ok: true, 
                    error: [],
                    data: {
                        token: await this.tokenGenerated(result),
                        name: result.firstname,
                        lastname: result.lastname,
                        username: result.user,
                        email:result.email,
                        country: result.country,
                        phone_number: result.phone
                    }
                }
            }
        }else{
            return {
                data: { error: { message: 'The email or password is incorrect', status: 200, ok: false }}
            } 
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
        return await this.jwtService.sign(payload);;
    }
}