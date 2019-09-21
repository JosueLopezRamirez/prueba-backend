import { IsOptional, IsNotEmpty, IsNumber, IsString, MaxLength, IsDateString } from "class-validator";

export class DetailVehicleDto {

    @IsOptional() id:number;

    @IsNotEmpty()@IsString()@MaxLength(50) id_type_vehicle: string;

    @IsNotEmpty()@IsString()@MaxLength(80) trademark: string;

    @IsNotEmpty()@IsString()@MaxLength(80) model:string;

    @IsNotEmpty() year: Date;

    @IsNotEmpty()@IsNumber() skiperAgentDriver: number;

    @IsNotEmpty()@IsNumber() skiperCatService: number;

}