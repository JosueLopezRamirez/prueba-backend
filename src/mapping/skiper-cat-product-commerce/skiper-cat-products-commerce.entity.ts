import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { SkiperCommerce } from "../skiper-commerce/skiper-commerce.entity";


@Entity()
export class SkiperCatProductsCommerce {

    @PrimaryGeneratedColumn() id:number;

    @Column('varchar',{nullable:true,length:50}) name:string;

    @Column('varchar',{nullable:true,length:500})description:string;

    @Column('longtext',{nullable:false}) url_img_product:string;

    @ManyToOne(type => SkiperCommerce, {nullable: false})
    @JoinColumn({name:'id_commerce'}) skiperCommerce: SkiperCommerce;
}
