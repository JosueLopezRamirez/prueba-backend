import { InputType, ObjectType } from "type-graphql";

@InputType()
export class SkiperCatTravelsInput {
    id: number;
    name: string;
    url_img_category: string;
    url_img_drive: string;
    mode_drive: string;
    btaxy:boolean;
    bdelivery:boolean;
    btransporte:boolean;
}

@ObjectType()
export class SkiperCatTravelDto {
    id: number;
    name: string;
    url_img_category: string;
    url_img_drive: string;
    mode_drive: string;
}