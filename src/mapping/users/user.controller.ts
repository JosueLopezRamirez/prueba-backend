import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { validate } from 'class-validator';

@Controller('user')
export class UserController {
    
    private logger = new Logger('UserController');

    constructor(private readonly userService: UserService){}

    //Get a all users
    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getAll(): Promise<User[]> {
    return await this.userService.getAll();
    }

    @Post('/email')
    async SP_PRUEBA(@Body() body){
        return this.userService.SP_USERS_COMMERCE(body);
    }

    //Find user by id
    @Get('/:id')
    async findById(@Param() id): Promise<User> {
        let user = await this.userService.findById(id);
        this.logger.log(`Usuario de id ${user}`);
        return user;
    }

    //Find user by email
    @Post('/by_email')
    async findByEmail(@Body() email: string): Promise<User> {
        return await this.userService.findByEmail(email);
    }

    //Create a new user
    @Post('/')
    async create(@Body() user: UserDto) {
        await validate(user).then(errors => {
            if(errors.length > 0){
                this.logger.debug(`validation failed. errors: ${errors}`);
            }else{
                this.logger.debug("validation succeed");
            }
        })
        return this.userService.create(user);
    }

    //Update a user
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
                data: { error: { message: 'The user dont exist in the database', status: 200, ok: false }}
            };
        }
    }

    //Delete a user
    @Delete('/:id')
    async delete(@Param() id) {
        let user = await this.userService.findById(id);
        return this.userService.delete(user);
    }

    //Probando la validacion de las rutas
    async findByPayload(payload:any){
        const { user } = payload;
        return await this.userService.findByPayload(user);
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