import { Module } from '@nestjs/common';
import { SkiperOrder } from './skiper-order.entity';
import { SkiperOrderService } from './skiper-order.service';
import { SkiperOrderResolver } from './skiper-order.resolver';

import { UsersModule } from '../users/users.module';
import { SkiperCommerceModule } from '../skiper-commerce/skiper-commerce.module'

import { TypeOrmModule} from '@nestjs/typeorm';
import { SkiperOrdersStatusModule } from '../skiper-orders-status/skiper-orders-status.module';

@Module({
  imports: [
    UsersModule,
    SkiperOrdersStatusModule,
    SkiperCommerceModule,
    TypeOrmModule.forFeature([SkiperOrder])
  ],
  providers: [
    SkiperOrderService, 
    SkiperOrderResolver],
  exports: [SkiperOrderService]
})

export class SkiperOrderModule {}
