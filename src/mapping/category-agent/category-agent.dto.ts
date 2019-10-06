import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class categoryDto {
    
    @Field({nullable:true}) id:number;
    
    @Field({nullable:true}) name:string;
}