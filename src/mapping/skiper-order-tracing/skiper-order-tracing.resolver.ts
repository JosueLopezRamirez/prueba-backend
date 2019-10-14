import { Resolver, Query } from '@nestjs/graphql';
import { SkiperOrderTracingService } from './skiper-order-tracing.service';

@Resolver('SkiperOrderTracing')
export class SkiperOrderTracingResolver {

    constructor(private readonly service:SkiperOrderTracingService){}

    @Query()
    getAllOrderTracing(){
        return this.service.getAll();
    }
}
