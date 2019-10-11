import { InputType, ObjectType } from "type-graphql";

@InputType()
export class VehicleYearInput {
    id: number;
    year: Date;
}

@ObjectType()
export class VehicleYearDto {
    id: number;
    year: Date;
}