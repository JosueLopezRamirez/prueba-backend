import { Module } from '@nestjs/common';
import { SkiperOrderTracingService } from './skiper-order-tracing.service';
import { SkiperOrderTracingResolver } from './skiper-order-tracing.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkiperOrderTracing } from './skiper-order-tracing.entity';
import { SkiperOrderModule } from '../skiper-order/skiper-order.module';
import { SkiperOrdersStatusModule } from '../skiper-orders-status/skiper-orders-status.module';

@Module({
  imports:[
    SkiperOrderModule,
    SkiperOrdersStatusModule,
    TypeOrmModule.forFeature([SkiperOrderTracing])],
  providers: [SkiperOrderTracingService, SkiperOrderTracingResolver]
})
export class SkiperOrderTracingModule {}
