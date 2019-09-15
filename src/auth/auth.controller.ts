import { Controller, Post, Body } from  '@nestjs/common';
import { AuthService } from  '../auth/auth.service';
import { User } from  '../users/user.entity';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('auth')
export class AuthController {
    
    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() user: UserDto): Promise<any> {
      return this.authService.login(user);
    }  

    @Post('register')
    async register(@Body() user: UserDto): Promise<any> {
      return this.authService.register(user);
    }
}
