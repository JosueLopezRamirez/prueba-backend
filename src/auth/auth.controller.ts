import { Controller, Post, Body, Logger } from  '@nestjs/common';
import { AuthService } from  '../auth/auth.service';
import { signInDto } from './input/signIn.dto';
import { UserDecorator } from './user.decorator';
import { UserDto } from '../mapping/users/user.dto';
import { User } from 'src/mapping/users/user.entity';

@Controller('auth')
export class AuthController {
    
  private logger = new Logger('AuthController');

  constructor(private readonly authService: AuthService){}

  @Post('signin')
  async login(@Body() sign :signInDto): Promise<any> {
    return this.authService.login(sign);
  }  

  @Post('signup')
  async register(@UserDecorator() user: User): Promise<any> {
    return this.authService.register(user);
  }
}
