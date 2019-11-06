import { ObjectType, InputType } from 'type-graphql';
import { SkiperTravelsDto } from '../skiper-travels/skiper-travels.dto';
import {SkiperTravelsStatusDto} from '../skiper-travels-status/skiper-travels-status.dto';

@InputType()
export class SkiperTravelsTracingInput {
    idtravel: number;
    idtravelstatus: string;
    lat: number;
    lng: number;
    fecha: Date;
}

@ObjectType()
export class SkiperTravelsTracingDto {
    id: number;
    travel: SkiperTravelsDto;
    lat: number;
    lng: number;
    travelstatus: SkiperTravelsStatusDto;
    datetracing: Date;
}
