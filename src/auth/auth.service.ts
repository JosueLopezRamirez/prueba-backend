import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../mapping/users/user.service';
import { User } from '../mapping/users/user.entity';

import moment from 'moment';
import * as bcrypt from 'bcryptjs';
import Twilio from 'twilio';
import { createQueryBuilder } from 'typeorm';
import { ErrorResponse, SignResponse, SignInOk, twilioDto, ResetDto } from './auth.dto';
import { UserInput } from '../mapping/users/user.dto';
import { SkiperAgentService } from '../mapping/skiper-agent/skiper-agent.service';

@Injectable()
export class AuthService {

    private logger = new Logger('AuthService');
    private twilio = Twilio('AC380212e678f8f2efb650f7a963df98e6','bd5c3ab4dec94e95be051feed08484d6');

    constructor(
        private readonly userService: UserService,
        private readonly agentService: SkiperAgentService,
        private readonly jwtService: JwtService
    ) { }

    public async validate(email: string): Promise<User> {
        return await this.userService.findByEmail(email);
    }

    async login(sign: any): Promise<SignResponse> {
        let result = await this.validate(sign.email);
        if (result == undefined) {
            return new SignResponse(null, new ErrorResponse('The email or password is incorrect', 400, false));
        } else {
            if (!bcrypt.compareSync(sign.password, result.password)) {
                return new SignResponse(null, new ErrorResponse('The email or password is incorrect', 400, false));
            }

            if (result.is_online)
                return new SignResponse(null, new ErrorResponse('User is online in another device!', 400, false));
            
            let co, ve; //Definimos la variable commercio
            try {
                let agent = await this.agentService.getByUser(result);
                if (agent == undefined) {
                    co = null;
                    ve = null;
                }
                else {
                    co = await this.commerceByQueryBuilder(result, agent);
                    ve = await this.vehicleByQueryBuilder(result, agent);
                }
                //quitamos esto mas adelante se va a manejar un historico de ingresos.
                // let activo = await this.userService.updateOnlineStatus(result);
                return new SignResponse(new SignInOk(
                    await this.tokenGenerated(result), result.firstname,
                    result.lastname, result.user,
                    result.email, result.phone,result.avatar,result.country, co, ve, agent.id
                ), null);
            } catch (error) {
                console.log('aqui no')
                console.log(error)
            }
        }
    }

    public async register(input: UserInput): Promise<SignResponse> {
        let result = await this.userService.create(input);
        if (result === null) {
            console.log(result)
            return new SignResponse(null, new ErrorResponse('This email is already exist in the database!', 400, false));
        }
        if (result !== undefined) {
            return new SignResponse(new SignInOk(
                await this.tokenGenerated(result), result.firstname,
                result.lastname, result.user,
                result.email, result.phone,result.avatar,result.country
            ), null);
        } else {
            return new SignResponse(null, new ErrorResponse('Sponsor ID is not valid!', 400, false));
        }
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
            // let service= await this.twilio.verify.services.create({friendlyName: 'AlySkiper'})
            //           .then(service => console.log(service.sid));
            sendCode = await this.twilio.verify.services('VA3d3362d450f9260c0c6d7bee196b4d88')
                .verifications
                .create({
                    to: body.phone_number,
                    channel: body.channel
                })
            return new ErrorResponse('Code verification send successfully', 200, true)
        } catch (error) {
            console.log(error);
            return new ErrorResponse('Max send attempts reached', 429, false)
        }
    }

    async verifyCode(body: twilioDto): Promise<ErrorResponse> {
        let verifyCode
        try {
            verifyCode = await this.twilio.verify.services('VA3d3362d450f9260c0c6d7bee196b4d88')
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
    async reset(phone_number: string) {
        try {
            let result = await this.userService.findByPhone(phone_number);
            if (result !== undefined) {
                let body = { phone_number: result.phone, channel: 'sms' }
                let message = await this.sendCode(body);
                return new ResetDto(result,message);    
            }
            return new ResetDto(null,new ErrorResponse('Phone not exist!!', 200, true));
        } catch (error) {
            return new ResetDto(null,new ErrorResponse('Could not send verification code', 200, true));
        }
    }

    editPassowrd(input:any){
        let result =  this.userService.editPassowrd(input);
        if(result){
            return new ErrorResponse('Update password successfuly!!',200,true)
        }
    }

    async logout(id: number) {
        return await this.userService.logout(id);
    }

    private async commerceByQueryBuilder(result, agent) {
        let co = await createQueryBuilder("SkiperCommerce")
            .innerJoin("SkiperCommerce.skiperAgent", "SkiperAgent")
            .innerJoin("SkiperAgent.user", "User")
            .where("SkiperAgent.iduser = :userId", { userId: result.id })
            //comentariamos esta linea porque ocacionaba que no generara la info del comercio
            // .andWhere("SkiperCommerce.idagent = :agentId", { agentId: agent.id })
            .getOne();
        return co;
    }

    private async vehicleByQueryBuilder(result, agent) {
        let ve = await createQueryBuilder("SkiperVehicle")
            .innerJoinAndSelect("SkiperVehicle.skiperCatTravel", "SkiperCatTravel")
            .innerJoinAndSelect("SkiperVehicle.vehicleTrademark", "VehicleTrademark")
            .innerJoinAndSelect("SkiperVehicle.vehicleModel", "VehicleModel")
            .innerJoinAndSelect("SkiperVehicle.vehicleYear", "VehicleYear")
            .innerJoinAndSelect("SkiperVehicle.vehicleCatalog", "VehicleCatalog")
            .innerJoin("SkiperVehicle.skiperVehicleAgent", "SkiperVehicleAgent")
            .innerJoin("SkiperVehicleAgent.skiperAgent", "SkiperAgent")
            .innerJoin("SkiperAgent.user", "User")
            .where("User.id = :userId", { userId: result.id })
            //comentariamos esta linea porque ocacionaba que no generara la info del comercio
            // .andWhere("SkiperAgent.id = :agentId", { agentId: agent.id })
            .getOne();
        return ve;
    }
}