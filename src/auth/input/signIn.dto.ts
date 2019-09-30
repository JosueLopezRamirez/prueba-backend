import { IsEmail } from 'class-validator';
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
export class signUpDto {

    @Field({nullable:false}) readonly firstname: string;

    @Field({nullable:false}) readonly lastname: string;

    @Field({nullable:false}) readonly email: string;

    @Field({nullable:false}) readonly user: string;

    @Field({nullable:false}) readonly password: string;

    @Field({nullable:true}) readonly sponsor_id?: number;

    @Field({nullable:false}) readonly address: string;

    @Field({nullable:false}) readonly phone: string;

    @Field({nullable:false}) readonly create_at: Date;

    @Field({nullable:false}) readonly country_id: number;

    @Field({nullable:false}) readonly city_id: number;
}