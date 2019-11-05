import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('currency')
export class Currency {
    @PrimaryGeneratedColumn() id: number;
    @Column('varchar', { length: 30, nullable: false }) name: string;
}