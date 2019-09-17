import { Controller, Post, Body, Get, UseGuards } from  '@nestjs/common';
import { AuthService } from  '../auth/auth.service';
import { UserDto } from 'src/users/dto/user.dto';
import { signInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
    
    constructor(private readonly authService: AuthService){}

    @Post('signin')
    async login(@Body() sign :signInDto): Promise<any> {
      return this.authService.login(sign);
    }  

    @Post('signup')
    async register(@Body() user: UserDto): Promise<any> {
      return this.authService.register(user);
    }
}
