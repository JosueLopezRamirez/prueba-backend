import { ObjectType, Field, Int} from 'type-graphql';

@ObjectType()
export class CreateUserDto {

    constructor(){}
    
    @Field(() => Int) readonly id: number;

    @Field({nullable:false}) readonly firstname!: string;

    @Field({nullable:false}) readonly lastname!: string;

    @Field({nullable:false}) readonly email!: string;

    @Field({nullable:false}) readonly user!: string;

    @Field({nullable:false}) readonly password!: string;

    @Field(() => Int,{nullable:true}) readonly sponsor_id?: number;

    @Field({nullable:false}) readonly phone!: string;

    @Field({nullable:true}) readonly address?:string;

    @Field({nullable:true}) readonly create_at?: Date;

    // @Field({nullable:true}) countrie_id: ;

    // @Field({nullable:true}) city_id: number;
}