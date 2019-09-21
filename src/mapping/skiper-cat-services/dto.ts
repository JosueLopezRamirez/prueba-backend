import { IsOptional, IsNotEmpty, MaxLength, IsString } from "class-validator";


export class SkiperCatDto {

    @IsNotEmpty() id:number;

    @IsNotEmpty()
    @MaxLength(30) name:string;

    @IsString() url_img_service:string;
}