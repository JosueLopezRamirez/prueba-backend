import { Resolver, Query, Args } from '@nestjs/graphql';
import { VehicleTrademarksService } from './vehicle-trademarks.service';
import { ParseIntPipe } from '@nestjs/common';

@Resolver('VehicleTrademarks')
export class VehicleTrademarksResolver {

    constructor(private readonly service:VehicleTrademarksService) {}

    @Query()
    getAllVehicleTrademark(){
        return this.service.getAll();
    }

    @Query()
    getVehicleTrademarkById(@Args('id',ParseIntPipe) id:number) {
        return this.service.getById(id);
    }
}
