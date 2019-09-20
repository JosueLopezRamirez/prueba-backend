import { Module } from '@nestjs/common';
import { CountrieController } from './countrie.controller';
import { CountrieService } from './countrie.service';
import { Countrie } from './countrie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Countrie])],
  providers: [CountrieService],
  controllers: [CountrieController]
})
export class CountriesModule {}
