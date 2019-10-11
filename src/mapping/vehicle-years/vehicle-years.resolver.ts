import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { VehicleYearsService } from './vehicle-years.service';
import { VehicleYearInput } from './vehicle-years.dto';
import { ParseIntPipe } from '@nestjs/common';

@Resolver('VehicleYears')
export class VehicleYearsResolver {
    constructor(
        private readonly vehicleYearsService: VehicleYearsService
    ){}

    @Query()
    async vehicleyears() {
        return this.vehicleYearsService.getAll();
    }

    @Query()
    searchVehicleYears(@Args('id', ParseIntPipe) id: number) {
        return this.vehicleYearsService.getById(id);
    }

    @Mutation()
    async registerVehicleYear(@Args('input') input: VehicleYearInput){
        try {
            return this.vehicleYearsService.registerVehicleYear(input);
        }
        catch (error) 
        {
            console.error(error);
        }
    }

    @Mutation()
    async updateVehicleYear(@Args('input') input: VehicleYearInput) {
        return await this.vehicleYearsService.update(input);
    }
}
