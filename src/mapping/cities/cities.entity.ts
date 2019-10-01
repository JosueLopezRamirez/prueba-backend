import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Countrie } from "../countries/countrie.entity";

@Entity('cities')
export class Cities {

    @PrimaryGeneratedColumn()id:number;

    @Column({nullable:false})name:string;

    @ManyToOne(type => Countrie)
    @JoinColumn({name: 'idcountry'}) countrie:Countrie;
}
