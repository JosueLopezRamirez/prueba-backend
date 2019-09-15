import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    private logger = new Logger('AuthService');

    //Dependencies Injection from constructor in AuthService
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    //Validate data of user
    private async validate(userData: User): Promise<User> {
        return await this.userService.findByEmail(userData.email);
    }

    //Validate info from login from user
    public async login(user: User): Promise<any | { status: number }> {
        return this.validate(user).then(async (userData) => {
            
            const result = await this.userService.findByEmail(user.email)
            if (!result) {
                return {
                    data: { error: { message: 'The email or password is incorrect', status: 200, ok: false }}
                }
            }
            
            if (!bcrypt.compareSync(user.password, result.password)) {
                return {
                    data: { error: { message: 'The email or password is incorrect', status: 200, ok: false }}
                }
            }

            let payload = `${userData.password}`; //Creating payload
            const accessToken = this.jwtService.sign(payload); //Creating access Token
            this.logger.debug(`Generando Token con Payload ${JSON.stringify(payload)}`);
            //Return properties with tocken
            return {
                data: {
                    message: 'User logged in correctly',
                    status: 200,
                    ok: true, 
                    error: [],
                    data: {
                        token: accessToken,
                        name: `${result.firstname} ${result.lastname}`,
                        username: result.user,
                        country: result.country,
                        phone_number: result.phone
                    }
                }
            }
        });
    }

    //Register new user
    public async register(user: User): Promise<any> {
        // user.password = await bcrypt.hash(user.password, 10);
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
                        // token: accessToken,
                        name: `${result.firstname} ${result.lastname}`,
                        username: result.user,
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
}