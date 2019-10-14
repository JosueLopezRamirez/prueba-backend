import { ObjectType, Field } from "type-graphql";
import { countrieDto } from "../countries/countrie.dto";
import { UserDto } from "../users/user.dto";

@ObjectType()
export class citiesDto {

    id:number;
    name: string;
    countrie: countrieDto;
    users:UserDto[];
}