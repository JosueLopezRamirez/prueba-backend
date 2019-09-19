import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';


@Module({
  imports:[
    // UserDto,
    TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController]
})
export class UsersModule {}