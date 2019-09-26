import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../mapping/users/user.entity';
import { UserService } from "../mapping/users/user.service";
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { TwilioService } from './twilio.service';
import { TwilioController } from './twilio.controller';
import { UsersModule } from '../mapping/users/users.module';
import { AuthResolver } from './auth.resolver';

@Module({
    imports: [
        UsersModule,
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            privateKey: process.env.PRIVATE_KEY || 'supersecretamazingkey'
        }),
    ],
    providers: [UserService, AuthService,JwtStrategy, TwilioService, AuthResolver],
    controllers: [AuthController, TwilioController]
})
export class AuthModule {}