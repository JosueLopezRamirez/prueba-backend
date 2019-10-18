import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { SkiperOrderTracingService } from './skiper-order-tracing.service';
import { SkiperOrderTracingInput } from './skiper-order-tracing.dto';
import { SkiperOrderResolver } from '../skiper-order/skiper-order.resolver'

import { PubSub, withFilter } from 'graphql-subscriptions';
import { SkiperOrderService } from '../skiper-order/skiper-order.service';
import { SkiperOrder } from '../skiper-order/skiper-order.entity';
import { UseFilters, BadRequestException, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { HttpExcepcionFilter } from '../../shared/http.exception.filter';

const pubSub = new PubSub();

@Resolver('SkiperOrderTracing')
export class SkiperOrderTracingResolver {

    constructor(private readonly service:SkiperOrderTracingService,
    private f: SkiperOrderService){}

    @Query()
    getAllOrderTracing(){
        return this.service.getAll();
    }

    @Mutation()
    async registerOrderTracing(@Args('input') input: SkiperOrderTracingInput){
        let result = await this.service.create(input);
        await this.f.getById(input.orderID).then( async (res: SkiperOrder) => {
            let n = [input.orderStatusID]
            let pedido = await this.f.GetOrderByID(res.id)
            let cantidad = await this.f.getByCommerceIdByIdStatusCount(res.skiperCommerce.id, n)
            
            pubSub.publish('skiperOrderByCommerceIdByIdStatus', { skiperOrderByCommerceIdByIdStatus: pedido,
            idcomercio: res.skiperCommerce.id } )

            pubSub.publish('skiperOrderByCommerceIdByIdStatusCount', { skiperOrderByCommerceIdByIdStatusCount: cantidad,
            idcomercio: res.skiperCommerce.id })
        })
        return result
    }

    @Subscription('skiperOrderByCommerceIdByIdStatus',  {
        filter(payload, variables) {
            return payload.idcomercio === variables.idcomercio
        }
    })
    skiperOrderByCommerceIdByIdStatus() {
        return pubSub.asyncIterator('skiperOrderByCommerceIdByIdStatus')
    }

    @Subscription('skiperOrderByCommerceIdByIdStatusCount', {
        filter(payload, variables) {
            return payload.idcomercio === variables.idcomercio
        }
    })
    skiperOrderByCommerceIdByIdStatusCount() {
        return pubSub.asyncIterator('skiperOrderByCommerceIdByIdStatusCount')
    }
}