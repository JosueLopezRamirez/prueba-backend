import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        // UsersModule,
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            privateKey: process.env.PRIVATE_KEY || 'supersecret',
        }),
    ],
    providers: [UserService, AuthService],
    controllers: [AuthController]
})
export class AuthModule {}