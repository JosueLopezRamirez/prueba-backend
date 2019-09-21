import { IsOptional, IsBoolean, IsString, IsNotEmpty, IsNumber } from "class-validator";

export class AgentDriverDto {

    @IsOptional() id: number;

    @IsOptional()
    @IsBoolean() state:boolean;

    @IsOptional() has_reflective_vest: boolean;

    @IsNotEmpty()
    @IsString() url_doc_identity:string;

    @IsNotEmpty()
    @IsString() url_doc_letterone_recomendation:string;

    @IsNotEmpty()
    @IsString() url_doc_lettertwo_recomendation:string;

    @IsNotEmpty()
    @IsString() url_doc_verify_identity:string;

    @IsString()
    @IsOptional() url_doc_driver_licence:string;

    @IsNotEmpty()
    @IsString() url_doc_police_record:string;

    @IsNotEmpty()
    @IsString() url_doc_driving_record:string;

    @IsNumber() userId: number;
}