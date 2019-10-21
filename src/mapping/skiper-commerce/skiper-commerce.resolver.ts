import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { SkiperCommerceService } from './skiper-commerce.service';
import { CommerceInput } from './skiper-commerce.dto';
import { ParseIntPipe } from '@nestjs/common';

@Resolver('SkiperCommerce')
export class SkiperCommerceResolver {
    
    constructor(
        private readonly skiperCommerceService: SkiperCommerceService
    ){}

    @Query('commerces')
    async commerces() {
        return this.skiperCommerceService.getAll();
    }

    @Query()
    async CommercesIntoRadio(@Args('latitud') latitud: number, @Args('longitud') longitud: number) {
        return this.skiperCommerceService.getIntoRadio(latitud, longitud);
    }

    @Mutation('registerCommerce')
    async registerCommerce(@Args('input') input: CommerceInput){
        return this.skiperCommerceService.registerCommerce(input);
    }
}
