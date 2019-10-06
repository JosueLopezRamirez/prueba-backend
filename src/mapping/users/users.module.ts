import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { CountriesModule } from '../countries/countries.module';
import { CitiesModule } from '../cities/cities.module';

@Module({
  imports:[
    CitiesModule,
    CountriesModule,
    TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver],
  exports:[UserService]
})
export class UsersModule {}
