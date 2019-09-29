import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkiperAgentCommerceService } from './skiper-agent-commerce.service';
import { SkiperAgentCommerceController } from './skiper-agent-commerce.controller';
import { SkiperAgentCommerce } from './skiper-agent-commerce.entity';
import { UsersModule } from '../users/users.module';
import { SkiperAgentCommerceResolver } from './skiper-agent-commerce.resolver';

@Module({
  imports:[
    UsersModule,
    TypeOrmModule.forFeature([SkiperAgentCommerce])],
  providers: [SkiperAgentCommerceService, SkiperAgentCommerceResolver],
  // controllers: [SkiperAgentCommerceController],
  exports:[SkiperAgentCommerceService]
})
export class SkiperAgentCommerceModule {}
