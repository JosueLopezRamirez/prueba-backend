import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('apps')
export class Apps {
    @PrimaryGeneratedColumn() id: number;
    @Column('varchar', { length: 80, nullable: false }) name: string;
    @Column('longtext', { nullable: false }) description: string;
}