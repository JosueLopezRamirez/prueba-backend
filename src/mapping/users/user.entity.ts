import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { SkiperAgentCommerce } from '../skiper-agent-commerce/skiper-agent-commerce.entity';
import { SkiperAgentDriver } from '../skiper-agent-driver/skiper-agent-driver.entity';
import { Countrie } from '../countries/countrie.entity';
import { Cities } from '../cities/cities.entity';

@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column() firstname: string;

    @Column() lastname: string;

    @Column({ length: 100}) email: string;

    @Column({ length: 50}) user: string;

    @Column() password: string;
    
    @Column({nullable:true, default: 0}) sponsor_id: number;

    @Column() country: string;

    @Column({length: 100}) phone: string;

    @Column({default: Date.now()}) create_at: string;

    @OneToMany(() => SkiperAgentCommerce, skiperAgent => skiperAgent.user)
    skiperCommerce: SkiperAgentCommerce[];

    @OneToMany(() => SkiperAgentDriver, skiperAgent => skiperAgent.user)
    SkiperDriver: SkiperAgentDriver[];

    @ManyToOne(type => Countrie)
    @JoinColumn({name: 'idcountry'}) countrie:Countrie;

    @ManyToOne(type => Cities)
    @JoinColumn({name: 'idcity'}) city:Cities;
}