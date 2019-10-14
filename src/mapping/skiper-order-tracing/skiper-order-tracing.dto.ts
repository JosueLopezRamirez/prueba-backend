import { SkiperOrdersStatusDto } from "../skiper-orders-status/skiper-orders-status.dto";
import { SkiperOrderDto } from "../skiper-order/skiper-order.dto";
import { ObjectType } from "type-graphql";

@ObjectType()
export class SkiperOrderTracingDto {
    id: number;
    datetracing: Date;
    orderStatus: SkiperOrdersStatusDto;
    order: SkiperOrderDto;
}
