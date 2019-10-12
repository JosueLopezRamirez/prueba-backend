import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('ticket-category')
export class TicketCategory {
    @PrimaryGeneratedColumn() id: number;
    @Column('varchar', { length: 50, nullable: false }) name: string;
}
