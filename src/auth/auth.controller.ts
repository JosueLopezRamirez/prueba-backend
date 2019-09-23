import { Controller, Post, Body, Logger } from  '@nestjs/common';
import { AuthService } from  '../auth/auth.service';
import { UserDto } from '../mapping/users/user.dto';
import { signInDto } from './dto/signIn.dto';
import { UserDecorator } from '../mapping/users/user.decorator';

@Controller('auth')
export class AuthController {
    
  private logger = new Logger('AuthController');

  constructor(private readonly authService: AuthService){}

  @Post('signin')
  async login(@Body() sign :signInDto): Promise<any> {
    return this.authService.login(sign);
  }  

  @Post('signup')
  async register(@UserDecorator() user: UserDto): Promise<any> {
    return this.authService.register(user);;
  }
}
