import { InputType, ObjectType } from "type-graphql";

@InputType()
export class CurrencyInput {
    id: number;
    name: string;
}

@ObjectType()
export class CurrencyDto {
    id: number;
    name: string;
}