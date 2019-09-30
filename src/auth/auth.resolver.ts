import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { signInDto, signUpDto, twilioDto } from './input/signIn.dto';
import { UserDto } from '../mapping/users/user.dto';
import { Logger } from '@nestjs/common';
import { ResponseSignIn, ErrorResponse } from '../global.dto';
import * as bcrypt from 'bcryptjs';
import { Cities } from '../mapping/cities/cities.entity';
import { Countrie } from '../mapping/countries/countrie.entity';
import { CitiesService } from '../mapping/cities/cities.service';
import { CountrieService } from '../mapping/countries/countrie.service';
import { User } from '../mapping/users/user.entity';
import Twilio from 'twilio';

@Resolver('Auth')
export class AuthResolver {

    private logger = new Logger('AuthResolver');

    constructor(
        private readonly authService: AuthService,
        private readonly countrieService: CountrieService,
        private readonly citiesService:CitiesService
    ){}

    @Mutation(() => ResponseSignIn)
    async signin(@Args('input') sign: signInDto) {
        return await this.authService.login(sign);
    }

    @Mutation(() => ResponseSignIn)
    async signup(@Args('input') input: signUpDto) {
        let city = await this.citiesService.getById(input.city_id);
        let country = await this.countrieService.getById(input.country_id);
        if(city!==undefined && country!==undefined){
            let user: User = await this.parseUser(input,country,city);
            console.log(user)
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
}
