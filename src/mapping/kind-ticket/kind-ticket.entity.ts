import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('kind-ticket')
export class KindTicket {
    @PrimaryGeneratedColumn() id: number;
    @Column({ length: 50, nullable: true }) name: string;
}