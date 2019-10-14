import { ObjectType } from "type-graphql";
import { SkiperOrderTracing } from "../skiper-order-tracing/skiper-order-tracing.entity";

@ObjectType()
export class SkiperOrdersStatusDto {
    id: number;
    name: string;
    SkiperOrderTracing: SkiperOrderTracing[];
}
