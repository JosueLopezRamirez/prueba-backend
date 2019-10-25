import { ObjectType, InputType } from "type-graphql";
import { UserDto } from "../users/user.dto";
import { SkiperAgentDto } from "../skiper-agent/skiper-agent.dto";
import { Double } from 'typeorm';

@InputType()
export class SkiperTravelsInput {
    id: number;
    idusers: number;
    iddriver: number;
    lat_initial: Double;
    lng_initial: Double;
    lat_final_seggested: Double;
    lng_final_seggested:Double;
    lat_final: Double;
    lng_final: Double;
    date_init: Date;
    date_final: Date;
    distance: Double;
    total: Double;
    address_initial: string;
    address_final: string;
    address_suggested: string;
}

@ObjectType()
export class SkiperTravelsDto {
    id: number;
    idusers: UserDto;
    iddriver: SkiperAgentDto;
    lat_initial: number;
    lng_initial: number;
    lat_final_seggested: number;
    lng_final_seggested:number;
    lat_final: number;
    lng_final: number;
    date_init: number;
    date_final: number;
    distance: number;
    total: number;
    address_initial: string;
    address_final: string;
    address_suggested: string;
}
