import { InputType, ObjectType } from "type-graphql";

@InputType()
export class SkiperOrdersStatusInput {
    id: number;
    name: string;
}

@ObjectType()
export class SkiperOrdersStatusDto {
    id: number;
    name: string;
}
