import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { signInDto, signUpDto } from './input/signIn.dto';
import { UserDto } from '../mapping/users/user.dto';
import { Logger } from '@nestjs/common';
import { ResponseSignIn } from '../global.dto';
import * as bcrypt from 'bcryptjs';

@Resolver('Auth')
export class AuthResolver {

    private logger = new Logger('AuthResolver');

    constructor(
        private readonly authService: AuthService
    ){}

    // @Mutation(() => ResponseSignIn)
    // async signin(@Args('input') sign: signInDto) {
    //     return await this.authService.login(sign);
    // }

    // @Mutation(() => ResponseSignIn)
    // async signup(@Args('input') input: signUpDto) {
    //     let user: UserDto = await this.parseUser(input);
    //     return await this.authService.register(user);
        
    // }

    async parseUser(input: signUpDto): Promise<UserDto>{
        // console.log(input)
        let user: UserDto = new UserDto();
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
