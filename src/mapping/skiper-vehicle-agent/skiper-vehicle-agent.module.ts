import { Module } from '@nestjs/common';
import { SkiperVehicleAgentService } from './skiper-vehicle-agent.service';
import { SkiperVehicleAgentResolver } from './skiper-vehicle-agent.resolver';

@Module({
  providers: [SkiperVehicleAgentService, SkiperVehicleAgentResolver]
})
export class SkiperVehicleAgentModule {}
