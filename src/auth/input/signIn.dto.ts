import { IsEmail, IsNumber, IsString } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class signInDto {

    // @IsEmail()
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
export class signUpDto {

    // @IsString()
    @Field({nullable:false})
    firstname: string;
    
    // @IsString()
    @Field({nullable:false})
    lastname: string;

    // @IsEmail()
    @Field({nullable:false})
    email: string;

    // @IsString()
    @Field({nullable:false})
    user: string;

    // @IsString()
    @Field({nullable:false})
    password: string;
    
    // @IsNumber()
    @Field({nullable:true})
    sponsor_id: number;

    // @IsString()
    @Field({nullable:false})
    phone: string;

    @Field({nullable:false})
    create_at: string;
}