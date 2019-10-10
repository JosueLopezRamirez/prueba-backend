import { InputType, ObjectType} from "type-graphql";

import { SkiperOrderDto } from "../skiper-order/skiper-order.dto";
import { SkiperProductCommerceDto } from "../skiper-product-commerce/skiper-product-commerce.dto";

@InputType()
export class SkiperOrderDetailInput {
    id: number;
    quantity: number;
    price: number;
    discount: number;
    size: string;
    addon: string;
    extraPrice: number;
    orderID: number;
    itemID: number;
}

@ObjectType()
export class SkiperOrderDetailDto {
    id: number;
    quantity: number;
    price: number;
    discount: number;
    size: string;
    addon: string;
    extraPrice: number;
    order: SkiperOrderDto;
    item: SkiperProductCommerceDto;
}