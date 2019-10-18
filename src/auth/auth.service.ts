import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../mapping/users/user.service';
import { User } from '../mapping/users/user.entity';

import moment from 'moment';
import * as bcrypt from 'bcryptjs';
import Twilio from 'twilio';
import { createQueryBuilder } from 'typeorm';
import { ErrorResponse, SignResponse, SignInOk, twilioDto } from './auth.dto';
import { UserInput } from '../mapping/users/user.dto';
import { SkiperAgentService } from '../mapping/skiper-agent/skiper-agent.service';

@Injectable()
export class AuthService {

    private logger = new Logger('AuthService');
    private twilio = Twilio('AC025109cb3b97652dd56c78f6ba82217a', '6ae100725be88eab8310b19c07600c76');

    constructor(
        private readonly userService: UserService,
        private readonly agentService: SkiperAgentService,
        private readonly jwtService: JwtService
    ) { }

    public async validate(email: string): Promise<User> {
        return await this.userService.findByEmail(email);
    }

    public async login(sign: any): Promise<SignResponse> {

        let result = await this.validate(sign.email);
        if (result == undefined) {
            return new SignResponse(null, new ErrorResponse('The email or password is incorrect', 400, false));
        } else {
            (result.is_online)? new SignResponse(null, new ErrorResponse('User is online in another device!', 400, false)): console.log('No esta activo');
            if (!bcrypt.compareSync(sign.password, result.password)) {
                return new SignResponse(null, new ErrorResponse('The email or password is incorrect', 400, false));
            }
            let co, ve; //Definimos la variable commercio
            try {
                let agent = await this.agentService.getByUser(result);
                co = this.commerceByQueryBuilder(result, agent);
                ve = this.vehicleByQueryBuilder(result, agent);
            } catch (error) {
                console.log(error)
            }
            let activo = await this.userService.updateOnlineStatus(result);
            console.log('Usuario Activo : ',activo.is_online)
            return new SignResponse(new SignInOk(
                await this.tokenGenerated(result), result.firstname,
                result.lastname, result.user,
                result.email, result.phone, co
            ), null);
        }
    }

    public async register(input: UserInput): Promise<SignResponse> {
        // try {
            let result = await this.userService.create(input);
            // console.log(result)
            if(result === null){
                console.log(result)
                return new SignResponse(null, new ErrorResponse('This email is already exist in the database!', 400, false));
            }
            if(result !== undefined){
                return new SignResponse(new SignInOk(
                    await this.tokenGenerated(result), result.firstname,
                    result.lastname, result.user,
                    result.email, result.phone
                ), null);
            } else {
                return new SignResponse(null, new ErrorResponse('Sponsor ID is not valid!', 400, false));
            }
        // } catch (error) {
        //     console.log(error);
        //     return new SignResponse(null, new ErrorResponse('Error to create a user or user already exist!', 400, false));
        // }
    }

    async tokenGenerated(newUser: User) {
        const payload = {
            sub: newUser.id,
            exp: moment().add(15, 'days').unix(),
            iat: moment().unix()
        }
        return await this.jwtService.sign(payload);
    }

    async validateUser(payload: any) {
        return await this.userService.findByPayload(payload);
    }

    // ----------------------------------------------------------------------------
    // ----------------- Metodos twilio -------------------------------------------
    // ----------------------------------------------------------------------------
    async sendCode(body: twilioDto): Promise<ErrorResponse> {
        let sendCode
        try {
            sendCode = await this.twilio.verify.services('VA95d62cf85a1cb3fc48ce6cc0551a6701')
                .verifications
                .create({ 
                    to: body.phone_number, 
                    channel: body.channel 
                })
            console.log(sendCode);
            return new ErrorResponse('Code verification send successfully', 200, true)
        } catch (error) {
            console.log(error);
            return new ErrorResponse('Max send attempts reached', 429, false)
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

    // ------------------------------------------------------------------------------------------
    // Reset password
    // ------------------------------------------------------------------------------------------
    async reset(email: string) {
        try {
            let result = await this.validate(email);
            if (result !== undefined) {
                let body = { phone_number: result.phone, channel: 'sms' }
                return await this.sendCode(body);
            }
        } catch (error) {
            return new ErrorResponse('Could not send verification code', 200, true)
        }
    }

    private async commerceByQueryBuilder(result, agent) {
        let co = await createQueryBuilder("SkiperCommerce")
            .innerJoin("SkiperCommerce.skiperAgent", "SkiperAgent")
            .innerJoin("SkiperAgent.user", "User")
            .where("SkiperAgent.iduser = :userId", { userId: result.id })
            .andWhere("SkiperCommerce.idagent = :agentId", { agentId: agent.id })
            .getOne();
        return co;
    }

    private async vehicleByQueryBuilder(result, agent) {
        let ve = await createQueryBuilder("SkiperVehicleAgent")
            .select(["SkiperVehicleAgent.skiperAgent","SkiperVehicleAgent.skiperVehicle"])
            .innerJoinAndSelect("SkiperVehicleAgent.skiperAgent", "SkiperAgent")
            .innerJoinAndSelect("SkiperVehicleAgent.skiperVehicle", "SkiperVehicle")
            .innerJoinAndSelect("SkiperAgent.user", "User")
            .where("SkiperAgent.iduser = :userId", { userId: result.id })
            .andWhere("SkiperVehicleAgent.idagent = :agentId", { agentId: agent.id })
            .getOne();
        return ve;
    }
}