import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('ticket-status')
export class TicketStatus {
    @PrimaryGeneratedColumn() id: number;
    @Column('varchar', { length: 50, nullable: false }) name: string;
}
