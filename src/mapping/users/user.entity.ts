import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne, Tree, TreeChildren } from 'typeorm';
import { SkiperAgentCommerce } from '../skiper-agent-commerce/skiper-agent-commerce.entity';
import { SkiperAgentDriver } from '../skiper-agent-driver/skiper-agent-driver.entity';
import { Countrie } from '../countries/countrie.entity';
import { Cities } from '../cities/cities.entity';
import { ObjectType } from 'type-graphql';

@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn() id: number;

    @Column() firstname: string;

    @Column() lastname: string;

    @Column({ length: 100,unique:true}) email: string;

    @Column({ length: 50}) user: string;

    @Column() password: string;
    
    @Column({nullable:true, default: 0}) sponsor_id: number;

    @Column({length: 255}) addres: string;
    
    @Column({length: 100}) phone: string;

    @Column() create_at: Date;
    
    @ManyToOne(type => Countrie,{nullable:false})
    @JoinColumn({name: 'idcountry'}) countrie:Countrie;

    @ManyToOne(type => Cities,{nullable:false})
    @JoinColumn({name: 'idcity'}) city:Cities;
}