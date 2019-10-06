import { ObjectType, Field } from "type-graphql";
import { countrieDto } from "../countries/countrie.dto";

@ObjectType()
export class citiesDto {

    @Field({nullable:true}) id:number;
    @Field({nullable:true}) name: string;
    @Field({nullable:true}) countrie: countrieDto;
}