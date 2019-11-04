import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SkiperTravelsService } from './skiper-travels.service';
import { SkiperTravelsInput } from './skiper-travels.dto';
import { SkiperTravelsTracingResolver } from '../skiper-travels-tracing/skiper-travels-tracing.resolver';

@Resolver('SkiperTravels')
export class SkiperTravelsResolver {
    constructor(private readonly service: SkiperTravelsService,
        private readonly SkiperTravelsTracingResolver: SkiperTravelsTracingResolver) { }
    // por ahora esto nada mas
    @Query()
    async CalcularTarifa(@Args('idcountry') idcountry: number,
        @Args('idcity') idcity: number,
        @Args('idcategoriaviaje') idcategoriaviaje: number,
        @Args('date_init') date_init: Date, ) {
        return await this.service.CalcularTarifa(idcountry, idcity, idcategoriaviaje, date_init);
    }

    @Query()
    async getAllSkiperTravels() {
        return await this.service.getAll();
    }

    @Query()
    async getTravelsByUserId(@Args('idagent') idagent: number, @Args('idstatus') idstatus: number[]) {
        return await this.service.GetTravels(idagent, idstatus);
    }

    @Mutation()
    async GenerateTravel(@Args('inputviaje') inputviaje: SkiperTravelsInput) {
        var result = await this.service.GenerateTravel(inputviaje);
        if (result != null) {
            let viaje = await this.service.GetTravelByID(result.id)
            await this.SkiperTravelsTracingResolver.NotificarCambiosEnViaje(viaje, viaje.skiperagent.id)
            await this.SkiperTravelsTracingResolver.NotificarCambiosEnViaje(viaje, viaje.idusers)
            return result
        }
        else
            return null
    }

    @Query()
    async getTravelByAgentId(@Args('idagent') idagent: number) {
        return await this.service.getTravelByAgentId(idagent);
    }


    @Query()
    async getTravelByUserId(@Args('iduser') iduser: number) {
        return await this.service.getTravelByUserId(iduser);
    }
}
