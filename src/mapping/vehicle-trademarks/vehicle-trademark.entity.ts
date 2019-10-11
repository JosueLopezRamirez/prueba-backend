import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('vehicle_trademarks')
export class VehicleTrademark {

    @PrimaryGeneratedColumn() id: number;

    @Column('varchar', { nullable: false, length: 50 }) name: string;
}
