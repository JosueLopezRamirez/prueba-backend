import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { SkiperAgent } from "../skiper-agent/skiper-agent.entity";

@Entity()
export class SkiperVehicleAgent {

    @PrimaryGeneratedColumn() id:number;

    @ManyToOne(type => SkiperAgent, {nullable: false})
    @JoinColumn({name:'idagent'}) skiperAgent: SkiperAgent;
}
