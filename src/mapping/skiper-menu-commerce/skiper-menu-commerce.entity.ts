import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { SkiperDetailCommerce } from "../skiper-detail-commerce/skiper-detail-commerce.entity";

@Entity('skiper_menu_commerce')
export class SkiperMenuCommerce {

    @PrimaryGeneratedColumn() id:number;

    @Column({length:50}) name:string;

    @Column('decimal') price:number;

    @Column('text',{nullable:true}) detail:string;

    @Column('text',{nullable:true}) url_image:string;

    @Column('bit',{nullable:true}) avaliable:boolean;

    @ManyToOne(type => SkiperDetailCommerce,{nullable: false})
    @JoinColumn({name:'id_commerce'})
    skiperDetailCommerce: SkiperDetailCommerce;
}
