import { Module } from '@nestjs/common';
import { SkiperVehicleService } from './skiper-vehicle.service';
import { SkiperVehicleResolver } from './skiper-vehicle.resolver';

@Module({
  providers: [SkiperVehicleService, SkiperVehicleResolver]
})
export class SkiperVehicleModule {}
