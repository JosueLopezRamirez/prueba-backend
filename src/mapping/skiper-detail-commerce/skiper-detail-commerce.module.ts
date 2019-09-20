import { Module } from '@nestjs/common';
import { SkiperDetailCommcerceController } from './skiper-detail-commerce.controller';
import { SkiperDetailCommcerceService } from './skiper-detail-commerce.service';
import { SkiperDetailCommerce } from './skiper-detail-commerce.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([SkiperDetailCommerce])],
  controllers: [SkiperDetailCommcerceController],
  providers: [SkiperDetailCommcerceService]
})
export class SkiperDetailCommerceModule {}
