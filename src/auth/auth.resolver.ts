import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { signInDto, singUpDto } from './input/signIn.dto';
import { UserDto } from '../mapping/users/user.dto';
import * as bcrypt from 'bcryptjs';
import { SignInResponse } from './dto/auth.dto';
import { Logger } from '@nestjs/common';

@Resolver('Auth')
export class AuthResolver {

    private logger = new Logger('AuthResolver');

    constructor(
        private readonly authService: AuthService
    ){}

    @Mutation(() => SignInResponse)
    async signin(@Args('input') sign: signInDto) {
        return await this.authService.login(sign);
    }

    @Mutation(()=>String)
    async signup(
        @Args('input')
        input: singUpDto
    ) {
        let user: UserDto = await this.parseUser(input);
        return this.authService.register(user);
        
    }

    async parseUser(input: singUpDto){
        let user: UserDto;
        user.firstname = input.firstname;
        user.lastname = input.lastname;
        user.email = input.email;
        user.user = input.user;
        user.password = await bcrypt.hash(input.password,10);
        user.phone = input.phone;
        user.sponsor_id = input.sponsor_id;
        user.create_at = input.create_at;
        return user;
    }
}
