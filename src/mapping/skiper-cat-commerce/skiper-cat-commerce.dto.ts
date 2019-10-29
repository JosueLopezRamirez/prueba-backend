import { ObjectType, InputType } from "type-graphql";
import { SkiperSubCatCommerceDto } from '../skiper-sub-cat-commerces/skiper-sub-cat-commerces.dto';

@ObjectType()
export class SkiperCatCommerceDto {
    id: number
    name:string
    url_img_category:string
    subcatcommerce: SkiperSubCatCommerceDto[]
}

@InputType()
export class CatCommerceInput {
    id: number
    name:string
    url_img_category:string
}