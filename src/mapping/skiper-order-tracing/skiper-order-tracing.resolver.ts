import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SkiperOrderTracingService } from './skiper-order-tracing.service';
import { SkiperOrderTracingInput } from './skiper-order-tracing.dto';

@Resolver('SkiperOrderTracing')
export class SkiperOrderTracingResolver {

    constructor(private readonly service:SkiperOrderTracingService){}

    @Query()
    getAllOrderTracing(){
        return this.service.getAll();
    }

    @Mutation()
    registerOrderTracing(@Args('input') input: SkiperOrderTracingInput){
        return this.service.create(input);
    }
}