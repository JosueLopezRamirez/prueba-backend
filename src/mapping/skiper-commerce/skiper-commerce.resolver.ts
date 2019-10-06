import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { SkiperCommerceService } from './skiper-commerce.service';
import { CommerceInput } from './skiper-commerce.dto';

@Resolver('SkiperCommerce')
export class SkiperCommerceResolver {
    
    constructor(
        private readonly skiperCommerceService:SkiperCommerceService
    ){}

    @Query('commerces')
    async commerces() {
        return this.skiperCommerceService.getAll();
    }

    @Mutation('registerCommerce')
    async registerCommerce(@Args('input') input: CommerceInput){
        return this.skiperCommerceService.registerCommerce(input);
    }
}
