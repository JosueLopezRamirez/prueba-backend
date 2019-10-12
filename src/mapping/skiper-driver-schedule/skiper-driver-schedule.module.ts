import { Module } from '@nestjs/common';
import { SkiperDriverScheduleService } from './skiper-driver-schedule.service';
import { SkiperDriverScheduleResolver } from './skiper-driver-schedule.resolver';

@Module({
  providers: [SkiperDriverScheduleService, SkiperDriverScheduleResolver]
})
export class SkiperDriverScheduleModule {}
