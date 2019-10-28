import { Resolver , Query, Mutation, Args} from '@nestjs/graphql';
import { SkiperTravelsService } from './skiper-travels.service';
import { SkiperTravelsInput } from './skiper-travels.dto';

@Resolver('SkiperTravels')
export class SkiperTravelsResolver{
    constructor(private readonly service: SkiperTravelsService) { }
    // por ahora esto nada mas
    @Query()
    async CalcularTarifa(@Args('idcountry') idcountry : number,
    @Args('idcity') idcity: number, 
    @Args('idcategoriaviaje') idcategoriaviaje: number,
    @Args('date_init') date_init: Date,) {
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
        return await this.service.GenerateTravel(inputviaje);
    }
}
