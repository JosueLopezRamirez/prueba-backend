import { InputType, ObjectType } from "type-graphql";

@InputType()
export class TransactionTypeInput {
    id: number;
    name: string;
}

@ObjectType()
export class TransactionTypeDto {
    id: number;
    name: string;
}