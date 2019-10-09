import { InputType, ObjectType } from "type-graphql";

@InputType()
export class CommerceModuleInput {
    id: number;
    name: string;
}

@ObjectType()
export class CommerceModuleDto {
    id: number;
    name: string;
}