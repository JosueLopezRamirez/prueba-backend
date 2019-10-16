import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { CountriesModule } from '../countries/countries.module';
import { CitiesModule } from '../cities/cities.module';
import { UserCivilStatusModule } from '../user-civil-status/user-civil-status.module';

@Module({
  imports:[
    CitiesModule,
    CountriesModule,
    UserCivilStatusModule,
    TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver],
  exports:[UserService]
})
export class UsersModule {}
