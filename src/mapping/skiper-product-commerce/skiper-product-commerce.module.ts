import { Module } from '@nestjs/common';
import { SkiperProductCommerceService } from './skiper-product-commerce.service';
import { SkiperProductCommerceResolver } from './skiper-product-commerce.resolver';

@Module({
  providers: [SkiperProductCommerceService, SkiperProductCommerceResolver]
})
export class SkiperProductCommerceModule {}
