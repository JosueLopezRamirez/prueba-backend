import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Menu {

    @PrimaryGeneratedColumn() id:number;

    @Column({length:50}) name:string;

    @Column({length:500}) description:string;

    @Column('longtext') image:string;

}
