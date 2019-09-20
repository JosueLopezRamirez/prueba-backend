import { Module } from '@nestjs/common';
import { SkiperDetailVehicle } from './skiper-detail-vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkiperDetailVehicleService } from './skiper-detail-vehicle.service';
import { SkiperDetailVehicleController } from './skiper-detail-vehicle.controller';

@Module({
    imports:[TypeOrmModule.forFeature([SkiperDetailVehicle])],
    providers: [SkiperDetailVehicleService],
    controllers: [SkiperDetailVehicleController],
})
export class SkiperDetailVehicleModule {}
