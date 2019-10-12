import { Module } from '@nestjs/common';
import { SkiperOrdersStatusService } from './skiper-orders-status.service';
import { SkiperOrdersStatusResolver } from './skiper-orders-status.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkiperOrdersStatus } from './skiper-orders-status.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SkiperOrdersStatus])],
  providers: [SkiperOrdersStatusService, SkiperOrdersStatusResolver],
  exports:[SkiperOrdersStatusService]
})
export class SkiperOrdersStatusModule {}
