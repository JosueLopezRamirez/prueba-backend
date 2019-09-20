import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToOne } from "typeorm";
import { SkiperDetailCommerce } from "../skiper-detail-commerce/skiper-detail-commerce.entity";

@Entity('upload_commerce_doc')
export class UploadCommerceDoc {

    @PrimaryGeneratedColumn() id: number;

    @Column('text',{nullable: false}) url_doc_identification: string; 

    @Column('text',{nullable: false}) url_trade_registration: string;

    @Column('text',{nullable: false}) url_doc_power_letter_one: string;

    @Column('text',{nullable: false}) url_doc_power_letter_two: string;

    @Column('text',{nullable: false}) url_doc_power_letter_three: string;

    @Column('text',{nullable: false}) url_doc_power_letter_four: string;

    @Column('text',{nullable: false}) url_doc_commerce_outside_one: string;

    @Column('text',{nullable: false}) url_doc_commerce_outside_two: string;

    @Column('text',{nullable: false}) url_doc_commerce_inside_one: string;

    @Column('text',{nullable: false}) url_doc_commerce_inside_two: string;

    @Column('text',{nullable: false}) url_doc_commerce_inside_three: string;

    @Column('text',{nullable: false}) url_doc_commerce_inside_four: string;

    @ManyToOne(type => SkiperDetailCommerce,{nullable:false}) skiper_detail_commerce: SkiperDetailCommerce;
}
