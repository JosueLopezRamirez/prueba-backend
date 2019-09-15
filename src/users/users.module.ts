import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports:[
    TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController]
})
export class UsersModule {}
