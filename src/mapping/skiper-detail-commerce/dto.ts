import { IsOptional, IsNotEmpty, IsString, MaxLength, IsNumber } from "class-validator";


export class DetailCommerceDto {

    @IsOptional() id: number;

    @IsOptional()@IsString()@MaxLength(80) namecommerce: string;

    @IsOptional()@IsString()@MaxLength(100) identification_ruc: string;

    @IsOptional()@IsString()@MaxLength(80) phone: string;

    @IsOptional()@IsString()@MaxLength(100) address: string;

    @IsOptional()@IsString()@MaxLength(80) manager: string;

    @IsNotEmpty()@IsNumber() skiper_agent_commerce_id: number;

    @IsNotEmpty()@IsNumber() skiper_cat_service_id: number;
}