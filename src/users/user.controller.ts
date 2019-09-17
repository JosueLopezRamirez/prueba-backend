import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    
    constructor(private readonly userService: UserService){}

    
    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getAll(): Promise<User[]>{
        return await this.userService.getAll();
    }

    @Get('/:id')
    async getById(@Param() id: number) { 
        return await this.userService.findById(id);
    }

    @Post('/')
    async create(@Body() user: UserDto) {
        return await this.userService.create(user);
    }
    
    @Put('/:id')
    async update(@Param() id: number, @Body() input: UserDto): Promise<any> {
        let userActual =  await this.userService.findById(id);
        if(userActual){
            let user: User = this.parseUser(input);
            user.id = userActual.id;
            let userUpdate = await this.userService.update(user);
            return userUpdate ? userUpdate : undefined
        }else{
            return {
                data: { error: { message: 'The email or password is incorrect', status: 200, ok: false }}
            };
        }
    }

    @Delete('/:id')
    async delete(@Param() user: User) {
        return await this.userService.delete(user)
    }

    parseUser(input: UserDto): User{
        let user: User = new User();
        user.firstname = input.firstname;
        user.lastname = input.lastname;
        user.user = input.user;
        user.password = input.password;
        user.email = input.email;
        user.phone = input.phone;
        user.sponsor_id = input.sponsor_id;
        user.create_at = input.create_at;
        user.country = input.country;
        return user;
    }
}