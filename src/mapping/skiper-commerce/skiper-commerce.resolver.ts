import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { SkiperCommerceService } from './skiper-commerce.service';
import { CommerceInput } from './skiper-commerce.dto';
import { ParseIntPipe } from '@nestjs/common';

@Resolver('SkiperCommerce')
export class SkiperCommerceResolver {
    
    constructor(
        private readonly skiperCommerceService: SkiperCommerceService
    ){}

    @Query()
    async commerces() {
        return this.skiperCommerceService.getAll();
    }

    @Query()
    async CommercesIntoRadio(@Args('latitud') latitud: number, @Args('longitud') longitud: number,@Args('radio') radio: number) {
        return this.skiperCommerceService.getIntoRadio(latitud, longitud, radio);
        // return this.skiperCommerceService.commerceIntoRadio(latitud, longitud,radio);
    }

    @Mutation('registerCommerce')
    async registerCommerce(@Args('input') input: CommerceInput){
        return this.skiperCommerceService.registerCommerce(input);
    }
}
