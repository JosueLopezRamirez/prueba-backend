import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('apps')
export class Apps {
    @PrimaryGeneratedColumn() id: number;
    @Column({ length: 80, nullable: true }) name: string;
    @Column('text', { nullable: false }) description: string;
}
