import { Module } from '@nestjs/common';
import { SkiperDetailVehicle } from './skiper-detail-vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkiperDetailVehicleService } from './skiper-detail-vehicle.service';
import { SkiperDetailVehicleController } from './skiper-detail-vehicle.controller';
import { SkiperCatServicesModule } from '../skiper-cat-services/skiper-cat-services.module';
import { SkiperAgentDriverModule } from '../skiper-agent-driver/skiper-agent-driver.module';

@Module({
    imports:[
        SkiperAgentDriverModule,
        SkiperCatServicesModule,
        TypeOrmModule.forFeature([SkiperDetailVehicle])],
    providers: [SkiperDetailVehicleService],
    controllers: [SkiperDetailVehicleController],
    exports:[SkiperDetailVehicleService]
})
export class SkiperDetailVehicleModule {}
