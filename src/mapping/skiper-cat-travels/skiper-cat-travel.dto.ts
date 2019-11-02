import { InputType, ObjectType } from "type-graphql";

@InputType()
export class SkiperCatTravelsInput {
    id: number;
    name: string;
    url_img_category: string;
    mode_drive: string;
}

@ObjectType()
export class SkiperCatTravelDto {
    id: number;
    name: string;
    url_img_category: string;
    mode_drive: string;
}