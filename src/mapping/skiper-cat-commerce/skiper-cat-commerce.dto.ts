import { ObjectType, InputType } from "type-graphql";

@ObjectType()
export class SkiperCatCommerceDto {
    id: number
    name:string
    url_img_category:string
}

@InputType()
export class CatCommerceInput {
    id: number
    name:string
    url_img_category:string
}