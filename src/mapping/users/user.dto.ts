import { Field, ID, Int, InputType, ObjectType } from "type-graphql";
import { citiesDto } from "../cities/cities.dto";
import { countrieDto } from "../countries/countrie.dto";

@InputType()
export class UserInput {
    @Field(()=> ID) id:number;
    @Field({nullable:false}) firstname: string;
    @Field({nullable:false}) lastname: string;
    @Field({nullable:false}) email: string;
    @Field({nullable:true}) user: string;
    @Field({nullable:false}) password: string;
    @Field(() => Int,{nullable:true}) sponsor_id: number;
    @Field({nullable:true}) address: string;
    @Field({nullable:false}) phone: string;
    @Field({nullable:true}) create_at: Date;
    @Field(() => Int,{nullable:false}) country_id: number;
    @Field(() => Int,{nullable:false}) city_id: number;
}

@ObjectType()
export class UserDto {
    @Field(()=> ID) id:number;
    @Field({nullable:true}) firstname: string;
    @Field({nullable:true}) lastname: string;
    @Field({nullable:true}) email: string;
    @Field({nullable:true}) user: string;
    @Field({nullable:true}) password: string;
    @Field(() => Int,{nullable:true}) sponsor_id: number;
    @Field({nullable:true}) address: string;
    @Field({nullable:true}) phone: string;
    @Field({nullable:true}) create_at: Date;
    @Field({nullable:true}) city: citiesDto;
    @Field({nullable:true}) country: countrieDto;
}