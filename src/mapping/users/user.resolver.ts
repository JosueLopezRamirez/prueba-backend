import { Resolver,  Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserInput } from './user.dto';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../shared/auth.guard';
@Resolver('User')
export class UserResolver {

    constructor(
        private readonly userService: UserService
    ) { }

    @UseGuards(new AuthGuard())
    @Query()
    async users() {
        return await this.userService.getAll();
    }
    
    @UseGuards(new AuthGuard())
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

    @UseGuards(new AuthGuard())
    @Mutation()
    async updateUser(@Args('input') input: UserInput) {
        try {
            let result = await this.userService.update(input);
            return 'Usuario actualizado con exito!!';
        } catch (error) {
            return `Error resolver -> ${error}`
        }
    }
}