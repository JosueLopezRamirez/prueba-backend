import { SkiperAgentDto } from "../skiper-agent/skiper-agent.dto";
import { SkiperVehicleDto } from "../skiper-vehicle/skiper-vehicle.dto";
import { ObjectType } from "type-graphql";

@ObjectType()
export class SkiperVehicleAgentDto {
    id: number;
    skiperAgent: SkiperAgentDto;
    skiperVehicle: SkiperVehicleDto;
}
