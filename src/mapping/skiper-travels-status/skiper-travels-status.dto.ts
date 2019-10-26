import { InputType, ObjectType } from 'type-graphql';

@InputType()
export class SkiperTravelsStatusInput {
    id: number;
    name: string;
    indicator: string;
}

@ObjectType()
export class SkiperTravelsStatusDto {
    id: number;
    name: string;
    indicator: string;
}
