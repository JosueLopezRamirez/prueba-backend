import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { SkiperProductCommerceService } from './skiper-product-commerce.service';
import { ParseIntPipe } from '@nestjs/common';

@Resolver('SkiperProductCommerce')
export class SkiperProductCommerceResolver {

    constructor(private readonly service: SkiperProductCommerceService) { }

    @Query()
    async productsCommerce(){
        return await this.service.getAll();
    }

    @Query()
    productsByCommerceId(@Args('id',ParseIntPipe) id: number){
        console.log()
        return this.service.getAllByCommerceId(id);
    }

    @Query()
    async productsCommerceWithPagination(@Args('page',ParseIntPipe) page: number){
        return await this.service.getAllByPagination(page);
    }

    @Query()
    async productsCommerceById(@Args('id',ParseIntPipe) id: number){
        return await this.service.getById(id);
    }

    @Mutation()
    ChangeStateProducts(@Args('id',ParseIntPipe) id: number){
        return this.service.changeState(id);
    }
}
