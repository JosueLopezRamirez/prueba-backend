import { Module } from '@nestjs/common';
import { SkiperCatServicesService } from './skiper-cat-services.service';
import { SkiperCatServicesController } from './skiper-cat-services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkiperCatService } from './skiper-cat-service.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SkiperCatService])],
  providers: [SkiperCatServicesService],
  // controllers: [SkiperCatServicesController],
  exports:[SkiperCatServicesService]
})
export class SkiperCatServicesModule {}
