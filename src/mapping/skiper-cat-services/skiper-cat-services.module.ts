import { Module } from '@nestjs/common';
import { SkiperCatServicesService } from './skiper-cat-services.service';
import { SkiperCatServicesController } from './skiper-cat-services.controller';

@Module({
  providers: [SkiperCatServicesService],
  controllers: [SkiperCatServicesController]
})
export class SkiperCatServicesModule {}
