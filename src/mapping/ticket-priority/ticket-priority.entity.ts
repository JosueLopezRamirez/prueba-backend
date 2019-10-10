import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('ticket-priority')
export class TicketPriority {
    @PrimaryGeneratedColumn() id: number;
    @Column({ length: 50, nullable: true }) name: string;
}
