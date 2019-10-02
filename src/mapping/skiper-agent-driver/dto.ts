import { IsOptional, IsBoolean, IsString, IsNotEmpty, IsNumber } from "class-validator";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class AgentDriverDto {

    @Field({nullable:true}) id: number;

    @Field({nullable:true}) state:boolean;

    @Field({nullable:true}) has_reflective_vest: boolean;

    @Field({nullable:true}) url_doc_identity:string;

    @Field({nullable:true}) url_doc_letterone_recomendation:string;

    @Field({nullable:true}) url_doc_lettertwo_recomendation:string;

    @Field({nullable:true}) url_doc_verify_identity:string;

    @Field({nullable:true}) url_doc_driver_licence:string;

    @Field({nullable:true}) url_doc_police_record:string;

    @Field({nullable:true}) url_doc_driving_record:string;

    @Field({nullable:true}) userId: number;
}