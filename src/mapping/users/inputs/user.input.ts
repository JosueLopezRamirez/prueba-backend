import { Field, InputType, ID} from "type-graphql";

@InputType()
export class UserInput {

    @Field(() => ID,{nullable:true}) readonly id?: number;

    @Field({nullable:true}) readonly firstname?: string;

    @Field({nullable:true}) readonly lastname?: string;

    @Field({nullable:true}) readonly email?: string;

    @Field({nullable:true}) readonly user?: string;

    @Field({nullable:true}) readonly password?: string;

    @Field({nullable:true}) readonly sponsor_id?: number;

    @Field({nullable:true}) readonly country?: string;

    @Field({nullable:true}) readonly phone?: string;

    @Field({nullable:true}) readonly create_at?: string;
}