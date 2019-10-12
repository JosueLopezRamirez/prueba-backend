import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { SkiperAgent } from "../skiper-agent/skiper-agent.entity";
import { SkiperVehicle } from "../skiper-vehicle/skiper-vehicle.entity";

@Entity('skiper_vehicle_agente')
export class SkiperVehicleAgent {

    @PrimaryGeneratedColumn() id: number;

    @ManyToOne(type => SkiperAgent, { nullable: false })
    @JoinColumn({ name: 'idagent' }) skiperAgent: SkiperAgent;

    @ManyToOne(type => SkiperVehicle, { nullable: false })
    @JoinColumn({ name: 'idvehicle' }) skiperVehicle: SkiperVehicle;
}
