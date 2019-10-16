import { Resolver, Args, Mutation, Subscription } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { signInDto, SignResponse, ErrorResponse, twilioDto } from './auth.dto';
import { AuthService } from './auth.service';
import { UserInput } from '../mapping/users/user.dto';

const pubSub = new PubSub();

@Resolver('Auth')
export class AuthResolver {

    private logger = new Logger('AuthResolver');

    constructor(
        private readonly authService: AuthService
    ) { }

    @Mutation(() => SignResponse)
    async signin(@Args() input: signInDto) {
        let result = await this.authService.login(input);
        pubSub.publish('userLogged', { userLogged: result });
        return result;
    }

    @Mutation(() => SignResponse)
    async signup(@Args('user') input: UserInput) {
        return await this.authService.register(input);
    }

    @Mutation(() => ErrorResponse)
    async send_code(@Args('sendcode') sendcode: twilioDto) {
        return this.authService.sendCode(sendcode);
    }

    @Mutation(() => ErrorResponse)
    async verify_code(@Args('verifycode') verifycode: twilioDto) {
        return this.authService.verifyCode(verifycode);
    }

    @Mutation(() => ErrorResponse)
    async reset_password(@Args('email') email: string) {
        return this.authService.reset(email);
    }

    @Subscription('userLogged')
    userLogged() {
        return pubSub.asyncIterator('userLogged');
    }
}
