import { InputType, ObjectType } from "type-graphql";

@InputType()
export class AppsInput {
    id: number;
    name: string;
    description: string;
}

@ObjectType()
export class AppsDto {
    id: number;
    name: string;
    description: string;
}