import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInput } from './inputs/user.input';
import { User } from './user.entity';
import { PubSub } from 'graphql-subscriptions';

@Resolver('User')
export class UserResolver {

    constructor(private readonly usersService: UserService){}

    @Query(() => [CreateUserDto])
    async users() {
        return this.usersService.getAll();
    }

    @Mutation(() => CreateUserDto)
    async createUser(@Args('input') input: UserInput) {
        let user: User = this.parseUser(input);
        let createUser = await this.usersService.create(user);
        return createUser;
    }

    @Mutation(() => CreateUserDto)
    async updateUser(@Args('input') input: UserInput) {
        let _id: number = input.id.valueOf();
        let userActual = await this.usersService.findById(_id);
        try {
            if(userActual[0]!== undefined){
                let user: User = this.parseUser(input);
                user.id = userActual[0].id;
                let userUpdate = await this.usersService.update(user);
                return userUpdate ? userUpdate : undefined
            }else{
                return new CreateUserDto();
            }
        } catch (error) {
            return error;
        }
    }

    @Mutation(() => String)
    async deleteUser(@Args('input') input: UserInput) {
        let userEliminar = await this.usersService.findById(input.id);
        if(userEliminar[0]!== undefined){
            let user: User = userEliminar[0];
            let userDelete = await this.usersService.delete(user);
            return userDelete ? 'Usuario Eliminado' : ''; 
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
    parseUser(input: UserInput): User{
        let user: User = new User();
        user.firstname = input.firstname;
        user.lastname = input.lastname;
        user.user = input.user;
        user.password = input.password;
        user.email = input.email;
        user.phone = input.phone;
        user.sponsor_id = input.sponsor_id;
        user.create_at = input.create_at;
        return user;
    }
}
