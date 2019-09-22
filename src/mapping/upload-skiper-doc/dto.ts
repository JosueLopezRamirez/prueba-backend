import { IsOptional, IsNumber, IsString, IsNotEmpty } from "class-validator";

export class UploadDocVehicleDto {

    @IsOptional()@IsNumber() id : number;

    @IsString() url_doc_insurance:string;
    
    @IsString() url_doc_vehicle_circulation:string;
    
    @IsString() url_doc_mechanical_inspection:string;

    @IsString() url_doc_gas_emission:string;

    @IsString() url_doc_license_plate:string;

    @IsString() url_doc_vehicle_front:string;

    @IsString() url_doc_vehicle_behind:string;

    @IsString() url_doc_vehicle_side_right:string;

    @IsString() url_doc_vehicle_side_left:string;

    @IsString() url_doc_vehicle_inside_one:string;

    @IsString() url_doc_vehicle_inside_two:string;

    @IsString() url_doc_vehicle_inside_three:string;

    @IsString() url_doc_vehicle_inside_four:string;

    @IsNotEmpty()@IsNumber() skiper_detail_vehicle_id: number;
}