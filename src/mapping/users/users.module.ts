import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { UserResolver } from './user.resolver';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [UserService,UserDto, UserResolver],
  controllers: [UserController],
  exports:[UserService,UserDto]
})
export class UsersModule {}
