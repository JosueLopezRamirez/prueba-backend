import { Resolver, Query } from '@nestjs/graphql';
import {SkiperTravelsTracingService} from './skiper-travels-tracing.service';


@Resolver('SkiperTravelsTracing')
export class SkiperTravelsTracingResolver {
    constructor( private readonly service: SkiperTravelsTracingService) {}

    @Query('skipertravelstracing')
    async skipertravelstracing() {
        return this.service.getAll();
    }
}
