import { IsEmail, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class signInDto {

    @IsEmail()
    @Field({nullable:false}) email: string;

    @Field({nullable:false}) password: string;
}

@InputType()
export class twilioDto {

    @Field({nullable:false}) phone_number: string;
    
    @Field({nullable:true}) channel?: string;

    @Field({nullable:true}) code?: string;
}

@InputType()
export class singUpDto {
    
    @IsNumber()
    @Field({nullable:true}) id?: number;

    @Field({nullable:false})
    firstname: string;
    
    @Field({nullable:false})
    lastname: string;

    @IsEmail()
    @Field({nullable:false})
    email: string;

    @Field({nullable:false})
    user: string;

    @Field({nullable:false})
    password: string;
    
    @Field({nullable:true})
    sponsor_id: number;

    @Field({nullable:false})
    phone: string;

    @Field({nullable:false})
    create_at: string;
}