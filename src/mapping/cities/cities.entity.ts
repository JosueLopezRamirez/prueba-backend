import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Countrie } from "../countries/countrie.entity";
import { Max, Length } from "class-validator";

@Entity('cities')
export class Cities {

    @PrimaryGeneratedColumn() id:number;

    @Max(80)
    @Length(80)
    @Column({nullable:false})
    name:string;
    
    @ManyToOne(type => Countrie,{nullable:false})
    @JoinColumn({name: 'idcountry'}) country:Countrie;
}
