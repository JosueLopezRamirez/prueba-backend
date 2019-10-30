import { ObjectType, InputType } from "type-graphql";
import { CommerceDto } from "src/mapping/skiper-commerce/skiper-commerce.dto";
import { SkiperVehicleAgentDto } from "src/mapping/skiper-vehicle-agent/skiper-vehicle-agent.dto";
import { SkiperVehicleDto } from "src/mapping/skiper-vehicle/skiper-vehicle.dto";
import { countrieDto } from "src/mapping/countries/countrie.dto";
import { UserDto } from "src/mapping/users/user.dto";

@InputType()
export class signInDto {
    email:string;
    password:string;
}

@ObjectType()
export class SignInOk {

    constructor(token,firstname,lastname,username,email,phone_number,avatar,country,commerce?,vehicle?){
        this.token = token;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.phone_number = phone_number;
        this.avatar = avatar || "";
        this.country = country || null;
        this.commerce = commerce || null;
        this.vehicle = vehicle || null;
    }

    token: string
    firstname: string
    lastname: string
    username: string
    email: string
    phone_number: string
    avatar: string
    country: countrieDto
    commerce: CommerceDto
    vehicle: SkiperVehicleDto
}

@ObjectType()
export class ErrorResponse {

    constructor(message?,status?,ok?){
        this.message = message || null;
        this.status = status || null;;
        this.ok = ok || false;
    }

    message: string;
    status: number;
    ok: boolean;
}

@ObjectType()
export class SignResponse {

    constructor(data,error){
        this.data = data;
        this.error = error
    }

    data:SignInOk;
    error:ErrorResponse;
}

@InputType()
export class twilioDto {

    phone_number: string;
    channel?: string;
    code?: string;
}

@ObjectType()
export class ResetDto{

    constructor(data,error){
        this.data = data;
        this.error = error
    }

    error:ErrorResponse;
    data:UserDto;
}