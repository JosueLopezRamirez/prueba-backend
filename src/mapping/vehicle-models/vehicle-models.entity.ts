import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('vehicle_models')
export class VehicleModels {
    @PrimaryGeneratedColumn() id: number;
    @Column({ length: 50, nullable: true }) name: string;
}