import { Module } from '@nestjs/common';
import { SkiperTravelsService } from './skiper-travels.service';

@Module({
  providers: [SkiperTravelsService]
})
export class SkiperTravelsModule {}
