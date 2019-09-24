import { Module } from '@nestjs/common';
import { SkiperMenuCommerceController } from './skiper-menu-commerce.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkiperMenuCommerce } from './skiper-menu-commerce.entity';

@Module({
    imports:[TypeOrmModule.forFeature([SkiperMenuCommerce])],
    controllers: [SkiperMenuCommerceController]
})
export class SkiperMenuCommerceModule {}
