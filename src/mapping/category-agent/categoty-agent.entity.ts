import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class CategoryAgent {

    @PrimaryGeneratedColumn() id:number;
    
    @Column({nullable:false,length:50}) name:string
}
