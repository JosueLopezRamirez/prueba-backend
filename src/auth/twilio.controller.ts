import { Controller, Post, Body } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { twilioDto } from './dto/signIn.dto';
import { UserService } from 'src/mapping/users/user.service';

@Controller('twilio')
export class TwilioController {

    constructor(
      private twilioService: TwilioService,
      private userService: UserService
    ){}
    
    @Post('send_code')
    async login(@Body() twilio: twilioDto): Promise<any> {
      return this.twilioService.sendCode(twilio);
    }  

    @Post('verify_code')
    async register(@Body() twilio: twilioDto): Promise<any> {
      return this.twilioService.verifyCode(twilio);
    }

    @Post('reset_password')
    async resetPassword(@Body() id: number): Promise<any>{
      const user = await this.userService.findById(id);
      if(user){
        const twilio: twilioDto = new twilioDto();
        twilio.phone_number = user.phone;
        twilio.channel = 'sms';
        return this.twilioService.sendCode(twilio);
      }else{
        return {error: { message: 'The user dont exist', ok: true, status: 404}}
      }
    }
}
