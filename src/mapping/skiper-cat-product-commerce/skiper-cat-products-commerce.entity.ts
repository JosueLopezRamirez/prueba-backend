import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { SkiperCommerce } from "../skiper-commerce/skiper-commerce.entity";
import { SkiperProductCommerce } from '../skiper-product-commerce/skiper-product-commerce.entity';


@Entity()
export class SkiperCatProductsCommerce {

    @PrimaryGeneratedColumn() id:number;

    @Column('varchar',{nullable:true,length:50}) name:string;

    @Column('varchar',{nullable:true,length:500})description:string;

    @Column('longtext',{nullable:false}) url_img_product:string;


    // @OneToMany(type => SkiperCommerce, skiperCommerce => skiperCommerce.id) 
    // @JoinColumn({name:'id_commerce'}) skiperCommerce: SkiperCommerce[];
    
    // @OneToMany(type => SkiperCommerce, {nullable:false}) // note: we will create author property in the Photo class below
    // @JoinColumn({name:'id_commerce'}) skiperCommerce: SkiperCommerce;

    @ManyToOne(type => SkiperCommerce, {nullable: false})
    @JoinColumn({name:'id_commerce'}) skiperCommerce: SkiperCommerce;

    @OneToMany(type => SkiperProductCommerce, x => x.skiperProducts) // note: we will create author property in the Photo class below
    SkiperProductCommerce: SkiperProductCommerce[];

}
