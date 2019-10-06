import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserInput } from './user.dto';
import { ParseIntPipe } from '@nestjs/common';

@Resolver('User')
export class UserResolver {

    constructor(
        private readonly userService: UserService
    ){}
    
    // @UseGuards(AuthGuard('jwt'))
    @Query('users')
    async users(){
        return await this.userService.getAll();
    }

    @Mutation(() => String)
    async createUser(@Args('user') input: UserInput) {
        try {
            let result = await this.userService.create(input);
            return 'Usuario registrado con exito!!';
        } catch (error) {
            return `Error resolver -> ${error}`
        }
    }

    @Mutation(() => String)
    async updateUser(@Args('user') input: UserInput) {
        try {
            let result = await this.userService.update(input);
            return 'Usuario actualizado con exito!!';
        } catch (error) {
            return `Error resolver -> ${error}`
        }
    }

    // @Mutation(() => String)
    // async changeState(@Args('id',ParseIntPipe) id:number){
    //     try {
    //         let result = await this.userService.changeState(id);
    //         return 'Usuario dado de baja con exito!!'
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}