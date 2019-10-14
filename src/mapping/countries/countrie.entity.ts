import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Cities } from "../cities/cities.entity";


@Entity('countries')
export class Countrie {

    @PrimaryGeneratedColumn() id:number;

    @Column({length: 2,nullable:false}) iso: string;

    @Column({length: 80,nullable:false}) name: string;

    @Column({length: 80,nullable:false}) nicename: string;

    @Column({length: 3,nullable:true}) iso3: string;

    @Column({type: "smallint",nullable:true}) numcode: number;

    @Column({type: "int",nullable:false}) phonecode: number;

    @OneToMany(type => Cities, x => x.country)
    cities: Cities[];
}