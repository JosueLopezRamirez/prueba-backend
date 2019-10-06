import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizeProduct } from './size-product.entity';

@Module({
    imports:[TypeOrmModule.forFeature([SizeProduct])]
})
export class SizeProductModule {}
