import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import { SkiperAgentDriver } from "../skiper-agent-driver/skiper-agent-driver.entity";
import { SkiperCatService } from "../skiper-cat-services/skiper-cat-service.entity";

@Entity('skiper_vehicle')
export class SkiperDetailVehicle {

    @PrimaryGeneratedColumn() id:number;

    @Column({length: 50,nullable:false}) id_type_vehicle: string;

    @Column({length: 80,nullable: false}) trademark: string;

    @Column({length:80,nullable: false}) model:string;

    @Column('date',{nullable: false}) year: Date;

    @ManyToOne(type => SkiperAgentDriver,{nullable: false})
    @JoinColumn({name:'iddriver'})
    skiperAgentDriver: SkiperAgentDriver;

    @ManyToOne(type => SkiperCatService,{nullable: false})
    @JoinColumn({name:'id_cat_service'})
    skiperCatService: SkiperCatService;
}