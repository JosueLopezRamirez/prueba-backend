import {TypeOrmModule} from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import {SkiperTravelsTracing} from './skiper-travels-tracing.entity';
import { SkiperTravelsTracingService } from './skiper-travels-tracing.service';
import { SkiperTravelsTracingResolver } from './skiper-travels-tracing.resolver';
import {SkiperTravelsModule} from '../skiper-travels/skiper-travels.module';
import {SkiperTravelsStatusModule} from '../skiper-travels-status/skiper-travels-status.module';

@Module({
  imports: [
  SkiperTravelsStatusModule,
  forwardRef(() => SkiperTravelsModule),
  TypeOrmModule.forFeature([SkiperTravelsTracing])],
  providers: [SkiperTravelsTracingService, SkiperTravelsTracingResolver],
  exports: [ SkiperTravelsTracingService, SkiperTravelsTracingResolver ],
})
export class SkiperTravelsTracingModule {}
