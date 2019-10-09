import { Module } from '@nestjs/common';
import { SkiperOrderDetail } from './skiper-order-detail.entity';
import { SkiperOrderDetailService } from './skiper-order-detail.service';
import { SkiperOrderDetailResolver } from './skiper-order-detail.resolver';

import { SkiperOrderModule } from '../skiper-order/skiper-order.module';
import { SkiperProductCommerceModule } from '../skiper-product-commerce/skiper-product-commerce.module';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    SkiperOrderModule,
    SkiperProductCommerceModule,
    TypeOrmModule.forFeature([SkiperOrderDetail])
  ],
  providers: [
    SkiperOrderDetailService,
    SkiperOrderDetailResolver
  ],
  exports: [
    SkiperOrderDetailService
  ]
})
export class SkiperOrderDetailModule {}
