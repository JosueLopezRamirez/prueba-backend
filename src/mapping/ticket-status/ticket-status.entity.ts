import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('ticket-status')
export class TicketStatus {
    @PrimaryGeneratedColumn() id: number;
    @Column({ length: 50, nullable: true }) name: string;
}
