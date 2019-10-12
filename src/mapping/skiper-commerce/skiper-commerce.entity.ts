import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Countrie } from "../countries/countrie.entity";
import { SkiperAgent } from "../skiper-agent/skiper-agent.entity";
import { SkiperCatCommerce } from "../skiper-cat-commerce/skiper-cat-commerce.entity";

@Entity()
export class SkiperCommerce {

    @PrimaryGeneratedColumn() id: number;

    @Column({ nullable: true, length: 80 }) namecommerce: string;

    @Column({ nullable: false, length: 100 }) identification_ruc: string;

    @Column({ nullable: false, length: 80 }) phone: string;

    @Column({ nullable: false, length: 100 }) address: string;

    @Column({ nullable: false, length: 80 }) manager: string;

    @Column({ nullable: true }) lat: string;

    @Column({ nullable: true }) lon: string;

    @Column('text', { nullable: true }) url_art: string;

    @Column('text', { nullable: true }) url_logo: string;

    @ManyToOne(type => SkiperAgent, { nullable: false })
    @JoinColumn({ name: 'id_agent' }) skiperAgent: SkiperAgent;

    @ManyToOne(type => SkiperCatCommerce, { nullable: false })
    @JoinColumn({ name: 'id_cat_commerce' }) catCommerce: SkiperCatCommerce;

    @ManyToOne(type => Countrie, { nullable: false })
    @JoinColumn({ name: 'id_country' }) country: Countrie;
}
