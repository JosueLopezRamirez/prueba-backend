import { Resolver, Query, Args } from '@nestjs/graphql';
import { SizeProductService } from './size-product.service';
import { ParseIntPipe } from '@nestjs/common';

@Resolver('SizeProduct')
export class SizeProductResolver {

    constructor(private readonly service: SizeProductService) { }

    @Query()
    getAllSizeProduct() {
        return this.service.getAll();
    }

    @Query()
    getSizeProductById(@Args('id', ParseIntPipe) id: number) {
        return this.service.getById(id);
    }
}
