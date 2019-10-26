import { ObjectType, InputType } from 'type-graphql';
import { SkiperTravelsDto } from '../skiper-travels/skiper-travels.dto';
import {SkiperTravelsStatusDto} from '../skiper-travels-status/skiper-travels-status.dto';

@InputType()
export class SkiperTravelsTracingInput {
    id: number;
    idtravel: number;
    idtravelstatus: number;
    datetracing: Date;
}

@ObjectType()
export class SkiperTravelsTracingDto {
    id: number;
    travel: SkiperTravelsDto;
    travelstatus: SkiperTravelsStatusDto;
    datetracing: Date;
}
