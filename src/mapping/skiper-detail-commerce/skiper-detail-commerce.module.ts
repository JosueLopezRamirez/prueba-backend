import { Module } from '@nestjs/common';
import { SkiperDetailCommcerceController } from './skiper-detail-commerce.controller';
import { SkiperDetailCommcerceService } from './skiper-detail-commerce.service';
import { SkiperDetailCommerce } from './skiper-detail-commerce.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkiperAgentCommerceModule } from '../skiper-agent-commerce/skiper-agent-commerce.module';
import { SkiperCatServicesModule } from '../skiper-cat-services/skiper-cat-services.module';

@Module({
  imports:[
    SkiperAgentCommerceModule,
    SkiperCatServicesModule,
    TypeOrmModule.forFeature([SkiperDetailCommerce])],
  // controllers: [SkiperDetailCommcerceController],
  providers: [SkiperDetailCommcerceService],
  exports:[SkiperDetailCommcerceService]
})
export class SkiperDetailCommerceModule {}
