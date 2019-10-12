import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('skiper_orders_status')
export class SkiperOrdersStatus {

    @PrimaryGeneratedColumn() id: number;

    @Column('varchar', { nullable: false, length: 50 }) name: string;
}
