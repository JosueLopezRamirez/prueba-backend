import { Module } from '@nestjs/common';
import { SkiperOrderDetailService } from './skiper-order-detail.service';
import { SkiperOrderDetailResolver } from './skiper-order-detail.resolver';

@Module({
  providers: [SkiperOrderDetailService, SkiperOrderDetailResolver]
})
export class SkiperOrderDetailModule {}
