import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SkiperVehicleService } from './skiper-vehicle.service';
import { SkiperVehicleInput } from './skiper-vehicle.dto';

@Resolver('SkiperVehicle')
export class SkiperVehicleResolver {

    constructor(private readonly service:SkiperVehicleService){}

    @Query('getAllSkiperVehicle')
    getAllSkiperVehicle(){
        return this.service.getAll();
    }

    @Query()
    getSkiperVehicleById(@Args('id') id: number){
        return this.service.getById(id);
    }

    @Mutation()
    async registerSkiperVehicle(@Args('input') input: SkiperVehicleInput){
        let result = await this.service.registerSkiperVehicle(input);
        return result
    }

    @Mutation()
    async updateSkiperVehicle(@Args('input') input: SkiperVehicleInput){
        let result = await this.service.updateSkiperVehicle(input);
        return result
    }

}
