import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('skiper_travels_status')
export class SkiperTravelsStatus {
    @PrimaryGeneratedColumn() id: number;
    @Column('varchar', {nullable: false, length: 50 }) name: string;
    @Column('varchar', {nullable: true, length: 20 }) indicator: string;
}
