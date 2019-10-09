import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { SkiperOrderDetailService } from './skiper-order-detail.service';
import { SkiperOrderDetailInput } from './skiper-order-detail.dto';

@Resolver('SkiperOrderDetail')
export class SkiperOrderDetailResolver {
    constructor ( 
        private readonly skiperOrderDetailService: SkiperOrderDetailService 
    ) { }

    @Query()
    async skiperorderdetails() {
        return this.skiperOrderDetailService.getAll();
    }

    @Mutation()
    async registerSkiperOrderDetail(@Args('input') input: SkiperOrderDetailInput) {
        return this.skiperOrderDetailService.registerSkiperOrderDetail(input);
    }
}