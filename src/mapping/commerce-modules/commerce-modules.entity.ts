import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('commercemodule')
export class CommerceModules {
    @PrimaryGeneratedColumn() id: number;
    @Column({ length: 80, nullable:false }) name: string;
}