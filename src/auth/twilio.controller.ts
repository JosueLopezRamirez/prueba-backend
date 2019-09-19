import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { twilioDto } from './dto/signIn.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('twilio')
export class TwilioController {

    constructor(private twilioService: TwilioService){}
    
    @Post('send_code')
    //@UseGuards(AuthGuard('jwt'))
    async login(@Body() twilio: twilioDto): Promise<any> {
      return this.twilioService.sendCode(twilio);
    }  

    @Post('verify_code')
    //@UseGuards(AuthGuard('jwt'))
    async register(@Body() twilio: twilioDto): Promise<any> {
      return this.twilioService.verifyCode(twilio);
    }
}
