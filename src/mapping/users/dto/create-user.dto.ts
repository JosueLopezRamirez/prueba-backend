import { ObjectType, Field, Int} from 'type-graphql';

@ObjectType()
export class CreateUserDto {

    constructor(){}
    
    @Field(() => Int) readonly id: number;

    @Field({nullable:true}) readonly firstname?: string;

    @Field({nullable:true}) readonly lastname?: string;

    @Field({nullable:true}) readonly email?: string;

    @Field({nullable:true}) readonly user?: string;

    @Field({nullable:true}) readonly password?: string;

    @Field({nullable:true}) readonly sponsor_id?: number;

    @Field({nullable:true}) readonly phone?: string;

    @Field({nullable:true}) readonly addres?:string;

    @Field({nullable:true}) readonly create_at?: Date;

    // @Field({nullable:true}) countrie_id: ;

    // @Field({nullable:true}) city_id: number;
}