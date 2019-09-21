import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkiperAgentCommerceService } from './skiper-agent-commerce.service';
import { SkiperAgentCommerceController } from './skiper-agent-commerce.controller';
import { SkiperAgentCommerce } from './skiper-agent-commerce.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[
    UsersModule,
    TypeOrmModule.forFeature([SkiperAgentCommerce])],
  providers: [SkiperAgentCommerceService],
  controllers: [SkiperAgentCommerceController],
  exports:[SkiperAgentCommerceService]
})
export class SkiperAgentCommerceModule {}
