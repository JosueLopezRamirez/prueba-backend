import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInput } from './inputs/user.input';
import { User } from './user.entity';
import { Countrie } from '../countries/countrie.entity';
import { Cities } from '../cities/cities.entity';
import { CountrieService } from '../countries/countrie.service';
import { CitiesService } from '../cities/cities.service';
import * as bcrypt from 'bcryptjs';
import { InputType, Field } from 'type-graphql';

@Resolver('User')
export class UserResolver {

    constructor(
        private readonly usersService: UserService,
        private readonly countrieService: CountrieService,
        private readonly citiesService:CitiesService
    ){}

    @Query(() => [CreateUserDto])
    async users() {
        return this.usersService.getAll();
    }

    @Mutation(() => CreateUserDto)
    async createUser(@Args('input') input: UserInput) {
        let city = await this.citiesService.getById(input.city_id);
        let countrie = await this.countrieService.getById(input.country_id);
        if(city!==undefined && countrie!==undefined){
            let user: User = this.parseUser(input,countrie,city);
            user.password = await bcrypt.hash(user.password,10);
            try {
                let createUser = await this.usersService.create(user);
                return createUser;    
            } catch (error) {
                console.log(error)
            }
        }
        
    }

    @Mutation(() => CreateUserDto)
    async updateUser(@Args('input') input: UserInput) {
        let _id: number = input.id.valueOf();
        let userActual = await this.usersService.findById(_id);
        try {
            if(userActual[0]!== undefined){
                let city = await this.citiesService.getById(input.city_id);
                let countrie = await this.countrieService.getById(input.country_id);
                if(city!==undefined && countrie!==undefined){
                    let user: User = this.parseUser(input,countrie,city);
                    user.id = userActual[0].id;
                    let userUpdate = await this.usersService.update(user);
                    return userUpdate ? userUpdate : undefined
                }
            }else{
                return new CreateUserDto();
            }
        } catch (error) {
            return error;
        }
    }

    @Mutation(() => String)
    async deleteUser(@Args('id') id: number) {
        let userEliminar = await this.usersService.findById(id);
        if(userEliminar!== undefined){
            let userDelete = await this.usersService.delete(userEliminar);
            return 'Usuario Eliminado'; 
        }else{
            return 'El usuario no existe';
        }
    }

    // @Subscription('userCreated')
    // userCreated() {
    //     return {
    //         subscribe: () => pubSub.asyncIterator('userCreated'),
    //     };
    // }

    //Metodo para parsear el input con la entity
    parseUser(input: UserInput,countrie:Countrie,city:Cities): User{
        let user: User = new User();
        user.firstname = input.firstname;
        user.lastname = input.lastname;
        user.user = input.user;
        user.password = input.password;
        user.email = input.email;
        user.phone = input.phone;
        user.sponsor_id = input.sponsor_id;
        user.create_at = input.create_at;
        user.address = input.address;
        user.countrie = countrie;
        user.city = city;
        return user;
    }
}