import { InputType, ObjectType } from "type-graphql";

@InputType()
export class PaymentMethodsInput {
    id: number;
    name:string;
}

@ObjectType()
export class PaymentMethodsDto {
    id: number;
    name:string;
}