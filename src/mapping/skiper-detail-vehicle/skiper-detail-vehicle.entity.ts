import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { SkiperAgentDriver } from "../skiper-agent-driver/skiper-agent-driver.entity";
import { SkiperCatService } from "../skiper-cat-services/skiper-cat-service.entity";

@Entity('skiper_detail_vehicle')
export class SkiperDetailVehicle {

    @PrimaryGeneratedColumn() id:number;

    @Column({length: 50,nullable:false}) id_type_vehicle: string;

    @Column({length: 80,nullable: false}) trademark: string;

    @Column({length:80,nullable: false}) model:string;

    @Column('date',{nullable: false}) year: Date;

    @ManyToOne(type => SkiperAgentDriver,{nullable: false}) skiperAgentDriver: SkiperAgentDriver;

    @ManyToOne(type => SkiperCatService,{nullable: false}) skiperCatService: SkiperCatService;
}