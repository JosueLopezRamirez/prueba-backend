import { Module } from '@nestjs/common';
import { SkiperTariffsService } from './skiper-tariffs.service';
import { SkiperTariffsResolver } from './skiper-tariffs.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [SkiperTariffsService, SkiperTariffsResolver]
})
export class SkiperTariffsModule {}
