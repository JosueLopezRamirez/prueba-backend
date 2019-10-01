import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../mapping/users/user.service';
import { User } from '../mapping/users/user.entity';

import moment from 'moment';
import * as bcrypt from 'bcryptjs';
import { signInDto, twilioDto } from './input/signIn.dto';
import { SignInResponse } from './input/signIn.dto';
import { ErrorResponse, ResponseSignIn } from '../global.dto';
import Twilio from 'twilio';
import { createQueryBuilder } from 'typeorm';
import { CommerceOut } from '../mapping/skiper-agent-commerce/skiper-agent-commerce.dto';

@Injectable()
export class AuthService {

    private logger = new Logger('AuthService');
    private twilio = Twilio('AC025109cb3b97652dd56c78f6ba82217a', '6ae100725be88eab8310b19c07600c76');
    //Dependencies Injection from constructor in AuthService
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    //Validate data of user
    private async validate(sign: signInDto): Promise<User> {
        const result = await this.userService.findByEmail(sign.email);
        if (result !== undefined) {
            return result;
        } else {
            return undefined;
            // throw new AuthenticationError('You must be logged in');
        }
    }

    //Validate info from login from user
    public async login(sign: signInDto): Promise<ResponseSignIn> {
        return this.validate(sign).then(async (result) => {
            if (result == undefined) {
                return new ResponseSignIn(null, new ErrorResponse('The email or password is incorrect', 400, false));
            } else {

                if (!bcrypt.compareSync(sign.password, result.password)) {
                    return new ResponseSignIn(null, new ErrorResponse('The email or password is incorrect', 400, false));
                }
                const co: any = await createQueryBuilder("SkiperAgentCommerce")
                    // .innerJoinAndSelect("SkiperAgentCommerce.user","User")
                    .where("SkiperAgentCommerce.iduser = :userId", { userId: result.id })
                    .getOne();
                console.log(co)
                let responseCommerce: CommerceOut;
                return new ResponseSignIn(new SignInResponse(
                    await this.tokenGenerated(result), result.firstname,
                    result.lastname, result.user,
                    result.email, result.phone, co === undefined ? null : (responseCommerce = new CommerceOut(co.id, co.name_owner, co.identity, co.url_doc_identity, co.state, null))
                ), null);
            }
        });
    }

    public async register(user: User): Promise<ResponseSignIn> {
        let result;
        try {
            result = await this.userService.create(user);
            return new ResponseSignIn(new SignInResponse(
                await this.tokenGenerated(result), result.firstname,
                result.lastname, result.user,
                result.email, result.phone
            ), null);
        } catch (error) {
            return new ResponseSignIn(null, new ErrorResponse('Error to create a user or user already exist!', 400, false));
        }
    }

    //Probando la validacion de las rutas
    async validateUser(payload: any) {
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

    // ----------------------------------------------------------------------------
    // ----------------- Metodos twilio -------------------------------------------
    // ----------------------------------------------------------------------------

    async sendCode(body: twilioDto): Promise<ErrorResponse> {
        let sendCode
        try {
            sendCode = await this.twilio.verify.services('VA95d62cf85a1cb3fc48ce6cc0551a6701')
                .verifications
                .create({ to: body.phone_number, channel: body.channel })

            return new ErrorResponse('Code verification send successfully', 200, true)
        } catch (error) {
            return new ErrorResponse('Could not send verification code', 200, true)
        }
    }

    async verifyCode(body: twilioDto): Promise<ErrorResponse> {
        let verifyCode
        try {
            verifyCode = await this.twilio.verify.services('VA95d62cf85a1cb3fc48ce6cc0551a6701')
                .verificationChecks
                .create({ code: body.code, to: body.phone_number })
            if (verifyCode.status === 'approved') {
                return new ErrorResponse('Code successfully verify', 200, true)
            }
        } catch (error) {
            return new ErrorResponse('Could not send verification code', 200, false)
        }
    }
}

// 1957