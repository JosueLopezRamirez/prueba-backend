import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkiperCommerce } from './skiper-commerce.entity';
import { SkiperCommerceService } from './skiper-commerce.service';
import { SkiperCommerceResolver } from './skiper-commerce.resolver';
import { SkiperAgentModule } from '../skiper-agent/skiper-agent.module';
import { CountriesModule } from '../countries/countries.module';
import { SkiperCatCommerceModule } from '../skiper-cat-commerce/skiper-cat-commerce.module';

@Module({
    imports:[
        SkiperCatCommerceModule,
        CountriesModule,
        SkiperAgentModule,
        TypeOrmModule.forFeature([SkiperCommerce])],
    providers: [SkiperCommerceService, SkiperCommerceResolver],
    exports:[SkiperCommerceService]
})
export class SkiperCommerceModule {}
