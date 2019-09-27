import { ObjectType, Field } from "type-graphql";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { SignInResponse } from "./auth/dto/auth.dto";

@ObjectType()
export class ErrorResponse {

    constructor(message,status,ok){
        this.message = message;
        this.status = status;
        this.ok = ok;
    }
    
    @IsNotEmpty()
    @IsString()
    @Field() message: string;

    @IsNotEmpty()
    @IsNumber()
    @Field() status: number;

    @IsNotEmpty()
    @IsString()
    @Field() ok: boolean;
}

@ObjectType()
export class ResponseSignIn {

    constructor(data: SignInResponse,error: ErrorResponse){
        this.data = data;
        this.error = error;
    }

    @Field({nullable:true}) data?: SignInResponse;

    @Field({nullable:true}) error?: ErrorResponse;
}
