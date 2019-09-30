import { IsEmail } from 'class-validator';
import { InputType, Field, ObjectType } from 'type-graphql';

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

@ObjectType()
export class SignInResponse {

    
    constructor(token,firstname,lastname,username,email,phone_number){
        this.token = token;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.phone_number = phone_number;
    }

    @Field({nullable:true}) token: string;

    @Field({nullable:true}) readonly firstname: string;

    @Field({nullable:true}) readonly lastname: string;

    @Field({nullable:true}) readonly username: string;

    @Field({nullable:true}) readonly email: string;

    @Field({nullable:true}) readonly phone_number: string;
}