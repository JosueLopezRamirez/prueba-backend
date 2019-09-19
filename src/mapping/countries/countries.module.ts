import { Module } from '@nestjs/common';
import { CountrieService } from './countrie/countrie.service';
import { CountrieController } from './countrie/countrie.controller';
import { CountrieController } from './countrie.controller';
import { CountrieService } from './countrie.service';

@Module({
  providers: [CountrieService],
  controllers: [CountrieController]
})
export class CountriesModule {}
