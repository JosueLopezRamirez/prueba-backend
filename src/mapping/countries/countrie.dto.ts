import { IsOptional, IsNumber, IsNotEmpty } from "class-validator";

export class countrieDto {

    @IsOptional()
    @IsNumber()
    id:number;

    @IsNotEmpty()
    iso: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    nicename: string;

    @IsNotEmpty()
    iso3: string;

    @IsNotEmpty()
    @IsNumber()
    numcode: number;

    @IsNotEmpty()
    phonecode: number;
}