import { Module } from '@nestjs/common';
import { VehicleTrademarksService } from './vehicle-trademarks.service';
import { VehicleTrademarksResolver } from './vehicle-trademarks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleTrademark } from './vehicle-trademark.entity';

@Module({
  imports:[TypeOrmModule.forFeature([VehicleTrademark])],
  providers: [VehicleTrademarksService, VehicleTrademarksResolver]
})
export class VehicleTrademarksModule {}
