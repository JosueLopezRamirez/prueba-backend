import { ObjectType, Field, Int} from 'type-graphql';
import { SkiperAgentCommerce } from '../../skiper-agent-commerce/skiper-agent-commerce.entity';
import { SkiperAgentDriver } from '../../skiper-agent-driver/skiper-agent-driver.entity';
import { Countrie } from '../../countries/countrie.entity';
import { Cities } from '../../cities/cities.entity';
import { ManyToOne, JoinColumn, OneToMany } from 'typeorm';

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

    @Field({nullable:true}) readonly country?: string;

    @Field({nullable:true}) readonly phone?: string;

    @Field({nullable:true}) readonly create_at?: string;

    @Field({nullable:true}) readonly category: number;

    @OneToMany(() => SkiperAgentCommerce, skiperAgent => skiperAgent.user)
    skiperCommerce: SkiperAgentCommerce[];

    @OneToMany(() => SkiperAgentDriver, skiperAgent => skiperAgent.user)
    SkiperDriver: SkiperAgentDriver[];

    @ManyToOne(type => Countrie)
    @JoinColumn({name: 'idcountry'}) countrie:Countrie;

    @ManyToOne(type => Cities)
    @JoinColumn({name: 'idcity'}) city:Cities;
}