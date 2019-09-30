import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class countrieDto {

    @Field({nullable:true}) id:number;

    @Field({nullable:true}) iso: string;

    @Field({nullable:true}) name: string;

    @Field({nullable:true}) nicename: string;

    @Field({nullable:true}) iso3: string;

    @Field({nullable:true}) numcode: number;

    @Field({nullable:true}) phonecode: number;
}