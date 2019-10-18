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
    date_birth: Date;
    is_online: boolean;
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
    sponsor_id: number = null;
    address: string;
    phone: string;
    create_at: Date;
    date_birth: Date;
    is_online: boolean;
    city: citiesDto;
    country: countrieDto;
    civilStatus: UserCivilStatusDto;
}