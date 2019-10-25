import { Resolver, Query } from '@nestjs/graphql';
import { SkiperTravelsService } from './skiper-travels.service';

@Resolver('SkiperTravels')
export class SkiperTravelsResolver{
    constructor(private readonly service: SkiperTravelsService) { }
    // por ahora esto nada mas
    @Query()
    async getAllSkiperTravels() {
        return await this.service.getAll();
    }
}
