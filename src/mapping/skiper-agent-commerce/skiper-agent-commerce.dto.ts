import { IsOptional, IsNotEmpty, IsString, Max, IsBoolean, IsNumber, MaxLength } from "class-validator";

export class AgentCommerceDto {

    @IsOptional()
    id:number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(80)
    name_owner:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    identity:string;

    @IsNotEmpty()
    @IsString()
    url_doc_identity: string;

    @IsOptional()
    @IsBoolean()
    state: boolean;

    @IsNumber() userId: number;
}