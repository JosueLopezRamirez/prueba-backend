import { Module } from '@nestjs/common';
import { SkiperTariffsService } from './skiper-tariffs.service';
import { SkiperTariffsResolver } from './skiper-tariffs.resolver';

@Module({
  providers: [SkiperTariffsService, SkiperTariffsResolver]
})
export class SkiperTariffsModule {}
