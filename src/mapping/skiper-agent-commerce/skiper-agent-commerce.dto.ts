import { IsOptional, IsNotEmpty, IsString, Max, IsBoolean, IsNumber, MaxLength } from "class-validator";
import { ObjectType, Field, InputType, Int } from "type-graphql";
import { ErrorResponse } from "../../global.dto";

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

@ObjectType()
export class CommerceOut {

    constructor(id,name_owner,identity,url,state){
        this.id = id;
        this.identity = identity;
        this.name_owner = name_owner;
        this.state = state;
        this.url_doc_identity = url;
    }

    @Field(() => Int) readonly id: number;
    @Field({nullable:true}) name_owner:string;
    @Field({nullable:true}) identity?:string;
    @Field({nullable:true}) url_doc_identity?:string;
    @Field({nullable:true}) state?:boolean;
}

@ObjectType()
export class CommercesOut {

    constructor(){}

    @Field(() => Int) readonly id: number;
    @Field({nullable:false}) readonly name_owner:string;
    @Field({nullable:false}) readonly identity:string;
    @Field({nullable:false}) readonly url_doc_identity:string;
    @Field({nullable:false}) readonly state:boolean;
}

@InputType()
export class CommerceInput {
    
    @Field({nullable:false}) name_owner:string;
    @Field({nullable:false}) identity:string;
    @Field({nullable:false}) url_doc_identity:string;
    @Field({nullable:false}) state:boolean;
    @Field({nullable:false}) userId:number;
}

@ObjectType()
export class CommerceResponse{

    constructor(data,error){
        this.data = data;
        this.error = error;
    }

    @Field({nullable:true}) data:CommerceOut;
    @Field({nullable:true}) error:ErrorResponse;
}