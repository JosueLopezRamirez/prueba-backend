import { InputType, ObjectType } from "type-graphql";

@InputType()
export class SkiperCatTravelsInput {
    id: number;
    name: string;
    url_img_category: string;
}

@ObjectType()
export class SkiperCatTravelsDto {
    id: number;
    name: string;
    url_img_category: string;
}