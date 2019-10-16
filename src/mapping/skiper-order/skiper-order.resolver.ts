import { Resolver, Mutation, Args, Query, Subscription } from '@nestjs/graphql';
import { SkiperOrderService } from './skiper-order.service';
import { SkiperOrderInput } from './skiper-order.dto';
import { ParseIntPipe } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver('SkiperOrder')
export class SkiperOrderResolver {

    constructor(
        private readonly skiperOrderService: SkiperOrderService
    ) { }

    @Query('skiperorders')
    async skiperorders() {
        return this.skiperOrderService.getAll();
    }

    @Query()
    async skiperOrderByCommerceIdByIdStatus(@Args('idcommerce', ParseIntPipe) idcommerce: number, @Args('idstatus') idstatus: number[]) {
        let result = this.skiperOrderService.getByCommerceIdByIdStatus(idcommerce, idstatus);
        pubSub.publish('getByCommerceIdByIdStatus', { getByCommerceIdByIdStatus: result });
        return result;
    }

    @Query()
    searchSkiperOrder(@Args('id', ParseIntPipe) id: number) {
        return this.skiperOrderService.getById(id);
    }

    @Mutation('registerSkiperOrder')
    async registerSkiperOrder(@Args('input') input: SkiperOrderInput) {
        try {
            return this.skiperOrderService.registerSkiperOrder(input);
        } catch (error) {
            console.error(error);
        }
    }

    @Mutation()
    async updateSkiperOrder(@Args('input') input: SkiperOrderInput) {
        return await this.skiperOrderService.update(input);
    }

    @Subscription('getByCommerceIdByIdStatus')
    getByCommerceIdByIdStatus() {
        return pubSub.asyncIterator('getByCommerceIdByIdStatus');
    }
}
