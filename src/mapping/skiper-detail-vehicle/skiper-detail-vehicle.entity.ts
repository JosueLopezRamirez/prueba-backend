import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { SkiperAgentDriver } from "../skiper-agent-driver/skiper-agent-driver.entity";

@Entity('skiper_detail_vehicle')
export class SkiperDetailVechicle {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false})
    id_cat_service: number;


    @Column({length: 50,nullable:false})
    id_type_vehicle: string;

    @Column({length: 80,nullable: false})
    trademark: string;

    @Column({length:80,nullable: false})
    model:string;

    @Column({nullable: false})
    year: Date;

    @ManyToOne(type => SkiperAgentDriver,{nullable: false})
    skiperAgentDriver: SkiperAgentDriver;
}