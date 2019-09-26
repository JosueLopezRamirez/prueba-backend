import { Injectable } from '@nestjs/common';
import Twilio from 'twilio';
import { twilioDto } from './input/signIn.dto';

@Injectable()
export class TwilioService {

    private twilio :any;

    constructor(){
        this.twilio = Twilio('AC025109cb3b97652dd56c78f6ba82217a', '6ae100725be88eab8310b19c07600c76')
    }

    async sendCode(body: twilioDto) {
        let sendCode
        try {
          sendCode = await this.twilio.verify.services('VA95d62cf85a1cb3fc48ce6cc0551a6701')
            .verifications
            .create({ to: body.phone_number, channel: body.channel })

          return { data: { message: 'Code verification send successfully', code: sendCode } }
        } catch (error) {
          return { error: { message: 'Could not send verification code' } }
        }
    }

    async verifyCode(body: twilioDto){
        let verifyCode
        try {
          verifyCode = await this.twilio.verify.services('VA95d62cf85a1cb3fc48ce6cc0551a6701')
            .verificationChecks
            .create({ code: body.code, to: body.phone_number })
          if (verifyCode.status === 'approved') {
            return {data: { message: 'Code successfully verify' }, status: 200 }
          }
        } catch (error) {
          return { error: { message: 'Could not send verification code' }, status: 505 }
        }
    }
}