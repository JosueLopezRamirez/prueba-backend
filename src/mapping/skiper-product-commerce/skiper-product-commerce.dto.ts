import { InputType, ObjectType } from "type-graphql";
import { CommerceDto } from "../skiper-commerce/skiper-commerce.dto";
import { SkiperCatProductDto } from "../skiper-cat-product-commerce/skiper-cat-product-commerce.dto";

@InputType()
export class ProductCommerceInput {
    id:number;
    name:string;
    description:string;
    url_img_product:string;
    price:number;
    isSize:boolean;
    isAddon:boolean;
    discount:number;
    skiperCommerceID: number;
    skiperProductsID: number;
}

@ObjectType()
export class SkiperProductCommerceDto {
    id:number;
    name:string;
    description:string;
    url_img_product:string;
    price:number;
    isSize:boolean;
    isAddon:boolean;
    discount:number;
    skiperCommerce: CommerceDto;
    skiperProducts: SkiperCatProductDto;
}
