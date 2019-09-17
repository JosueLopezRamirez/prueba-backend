import { Controller, Post, Body, Get, UseGuards } from  '@nestjs/common';
import { AuthService } from  '../auth/auth.service';
import { UserDto } from 'src/users/dto/user.dto';
import { signIn } from './dto/signIn.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    
    constructor(private readonly authService: AuthService){}

    @Post('signin')
    async login(@Body() sign :signIn): Promise<any> {
      return this.authService.login(sign);
    }  

    @Post('signout')
    async register(@Body() user: UserDto): Promise<any> {
      return this.authService.register(user);
    }
}
