import { Resolver, Mutation, Args, Subscription } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { signInDto, signUpDto, twilioDto } from './input/signIn.dto';
import { Logger } from '@nestjs/common';
import { ResponseSignIn, ErrorResponse } from '../global.dto';
import * as bcrypt from 'bcryptjs';
import { Cities } from '../mapping/cities/cities.entity';
import { Countrie } from '../mapping/countries/countrie.entity';
import { CitiesService } from '../mapping/cities/cities.service';
import { CountrieService } from '../mapping/countries/countrie.service';
import { User } from '../mapping/users/user.entity';
import { UserService } from '../mapping/users/user.service';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver('Auth')
export class AuthResolver {

    private logger = new Logger('AuthResolver');

    constructor(
        private readonly authService: AuthService,
        private readonly countrieService: CountrieService,
        private readonly citiesService:CitiesService,
        private readonly userService:UserService
    ){}

    @Mutation(() => ResponseSignIn)
    async signin(@Args('input') sign: signInDto) {
        const loggedUser = await this.authService.login(sign);
        pubSub.publish('userLogged', { userLogged: loggedUser });
        return loggedUser;
    }

    @Mutation(() => ResponseSignIn)
    async signup(@Args('input') input: signUpDto) {
        let city = await this.citiesService.getById(input.city_id);
        let country = await this.countrieService.getById(input.country_id);
        if(city!==undefined && country!==undefined){
            let user: User = await this.parseUser(input,country,city);
            let userCreate = await this.authService.register(user);
            return userCreate;
        }
    }

    @Mutation(() => ErrorResponse)
    async send_code(@Args('sendcode') sendcode:twilioDto){
        return this.authService.sendCode(sendcode);
    }

    @Mutation(() => ErrorResponse)
    async verify_code(@Args('verifycode') verifycode:twilioDto){
        return this.authService.verifyCode(verifycode);
    }

    @Mutation(() => ErrorResponse)
    async reset_password(@Args('email') email:string){
        return this.reset(email);
    }


    async parseUser(input: signUpDto,country:Countrie,city:Cities): Promise<User>{
        let user: User = new User();
        user.firstname = input.firstname;
        user.lastname = input.lastname;
        user.email = input.email;
        user.user = input.user;
        user.password = await bcrypt.hash(input.password,10);
        user.phone = input.phone;
        user.sponsor_id = input.sponsor_id;
        user.address = input.address;
        user.create_at = input.create_at;
        user.countrie = country;
        user.city=city;
        return user;
    }

    // Reset password
    async reset(email:string){
        try {
            let result = await this.userService.findByEmail(email);
            if(result !== undefined){
                let body = {phone_number: result.phone, channel: 'sms'}
                return await this.send_code(body);
            }
        } catch (error) {
            return new ErrorResponse('Could not send verification code',200,true)
        }  
    }

    // @Subscription('userLogged')
    // userLogged() {
    //     return pubSub.asyncIterator('userLogged');
    // }
}
