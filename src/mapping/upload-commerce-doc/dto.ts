import { IsOptional, IsNumber, IsNotEmpty, IsString } from "class-validator";

export class UploadDocCommerceDto {

    @IsOptional()@IsNumber() id: number;

    @IsNotEmpty()@IsString() url_doc_identification_ruc: string; 

    @IsNotEmpty()@IsString() url_trade_registration: string;

    @IsNotEmpty()@IsString() url_doc_power_letter_one: string;

    @IsNotEmpty()@IsString() url_doc_power_letter_two: string;

    @IsNotEmpty()@IsString() url_doc_power_letter_three: string;

    @IsNotEmpty()@IsString() url_doc_power_letter_four: string;

    @IsNotEmpty()@IsString() url_doc_commerce_outside_one: string;

    @IsNotEmpty()@IsString() url_doc_commerce_outside_two: string;

    @IsNotEmpty()@IsString() url_doc_commerce_inside_one: string;

    @IsNotEmpty()@IsString() url_doc_commerce_inside_two: string;

    @IsNotEmpty()@IsString() url_doc_commerce_inside_three: string;

    @IsNotEmpty()@IsString() url_doc_commerce_inside_four: string;

    @IsNotEmpty()@IsNumber() skiper_detail_commerce_id: number;
}