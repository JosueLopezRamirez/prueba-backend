import { InputType, ObjectType } from "type-graphql";
import { citiesDto } from "../cities/cities.dto";
import { countrieDto } from "../countries/countrie.dto";
import { UserCivilStatusDto } from "../user-civil-status/user-civil-status.dto";

@InputType()
export class UserInput {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    user: string;
    password: string;
    sponsor_id: number;
    address: string;
    phone: string;
    create_at: Date;
    country_id: number;
    city_id: number;
    idcivil_status:number;
}

@ObjectType()
export class UserDto {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    user: string;
    password: string;
    sponsor_id: number;
    address: string;
    phone: string;
    create_at: Date;
    city: citiesDto;
    country: countrieDto;
    civilStatus: UserCivilStatusDto;
}