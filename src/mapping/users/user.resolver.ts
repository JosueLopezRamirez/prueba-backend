import { Resolver,  Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserInput } from './user.dto';
import { ParseIntPipe } from '@nestjs/common';
import { SignResponse } from 'src/auth/auth.dto';
@Resolver('User')
export class UserResolver {

    constructor(
        private readonly userService: UserService
    ) { }

    @Query()
    async users() {
        return await this.userService.getAll();
    }
    
    @Query()
    searchUser(@Args('id', ParseIntPipe) id: number) {
        return this.userService.findById(id);
    }

    @Mutation()
    async createUser(@Args('input') input: UserInput) {
        try {
            let result = await this.userService.create(input);
            return result;
        } catch (error) {
            return `Error resolver -> ${error}`
        }
    }

    @Mutation()
    async updateUser(@Args('input') input: UserInput) {
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