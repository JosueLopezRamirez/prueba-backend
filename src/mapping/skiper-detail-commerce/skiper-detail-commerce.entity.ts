import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { SkiperAgentCommerce } from "../skiper-agent-commerce/skiper-agent-commerce.entity";
import { SkiperCatService } from "../skiper-cat-services/skiper-cat-service.entity";

@Entity('skiper_detail_commerce')
export class SkiperDetailCommerce {


    @PrimaryGeneratedColumn() id: number;

    @Column({nullable: true,length: 80}) namecommerce: string;

    @Column({nullable: false,length: 100}) identification_ruc: string;

    @Column({nullable: false,length: 80}) phone: string;

    @Column({nullable: false,length: 100}) address: string;

    @Column({nullable: false,length: 80}) manager: string;

    @ManyToOne(type => SkiperAgentCommerce, {nullable: false})
    @JoinColumn({name:'idowner'})
    skiper_agent_commerce: SkiperAgentCommerce;

    @ManyToOne(type => SkiperCatService, {nullable: false})
    @JoinColumn({name:'id_cat_service'})
    skiperCatService: SkiperCatService;
}
