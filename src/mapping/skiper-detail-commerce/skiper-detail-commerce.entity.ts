import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { SkiperAgentCommerce } from "../skiper-agent-commerce/skiper-agent-commerce.entity";
import { SkiperCatService } from "../skiper-cat-services/skiper-cat-service.entity";

@Entity('skiper_detail_commerce')
export class SkiperDetailCommerce {


    @PrimaryGeneratedColumn() id: number;

    // @Column({nullable: false}) idowner: number; //Representa una llave foranea

    @Column({nullable: true,length: 80}) namecommerce: string;

    @Column({nullable: false}) id_cat_service: number; //Representa una llave foranea

    @Column({nullable: false,length: 100}) identification_ruc: string;

    @Column({nullable: false,length: 80}) phone: string;

    @Column({nullable: false,length: 100}) address: string;

    @Column({nullable: false,length: 80}) manager: string;

    @ManyToOne(type => SkiperAgentCommerce, {nullable: false}) skiper_agent_commerce: SkiperAgentCommerce;

    @ManyToOne(type => SkiperCatService, {nullable: false}) skiperCatService: SkiperCatService;
}
