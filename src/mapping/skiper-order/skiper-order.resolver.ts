import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { SkiperOrderService } from './skiper-order.service';
import { SkiperOrderInput } from './skiper-order.dto';

@Resolver('SkiperOrder')
export class SkiperOrderResolver {

    constructor(
        private readonly skiperOrderService: SkiperOrderService
    ) { }

    @Query('skiperorders')
    async skiperorders() {
        return this.skiperOrderService.getAll();
    }

    @Mutation('registerSkiperOrder')
    async registerSkiperOrder(@Args('input') input: SkiperOrderInput) {
        return this.skiperOrderService.registerSkiperOrder(input);
    }
}
