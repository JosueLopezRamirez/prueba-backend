import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cities } from './cities.entity';
import { CitiesResolver } from './cities.resolver';

@Module({
  imports:[TypeOrmModule.forFeature([Cities])],
  providers: [CitiesService, CitiesResolver],
  exports:[CitiesService]
})
export class CitiesModule {}
