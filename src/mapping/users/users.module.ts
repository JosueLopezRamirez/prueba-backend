import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserRepository } from './user.repository';


@Module({
  imports:[
    // UserDto,
    TypeOrmModule.forFeature([User,UserRepository])],
  providers: [UserService],
  controllers: [UserController]
})
export class UsersModule {}
