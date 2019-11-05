import { InputType, ObjectType } from 'type-graphql';

@InputType()
export class SkiperTravelsStatusInput {
    id: number;
    name: string;
    indicator: string;
    prevstatus: number;
    errorstatusprev: string;
}

@ObjectType()
export class SkiperTravelsStatusDto {
    id: number;
    name: string;
    indicator: string;
    prevstatus: number;
    errorstatusprev: string;
}
