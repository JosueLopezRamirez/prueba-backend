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
        //si el estado es recibido notificamos al cliente
        await this.f.getById(input.orderID).then( async (res: SkiperOrder) => {
            input.orderStatusID
            let pedido = await this.f.GetOrderByID(res.id)
            pubSub.publish('skiperOrders', { skiperNewOrders: pedido, idcomercio: res.skiperCommerce.id })
        })
        return result
    }

    @Subscription('skiperOrders',  {
        filter(payload, variables) {
            return payload.idcomercio === variables.idcomercio
        }
    })
    skiperOrderByCommerceIdByIdStatus() {
        return pubSub.asyncIterator('skiperOrders')
    }
}