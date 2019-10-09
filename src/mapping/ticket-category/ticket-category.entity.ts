import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('ticket-category')
export class TicketCategory {
    @PrimaryGeneratedColumn() id: number;
    @Column({ length: 50, nullable: true }) name: string;
}
