import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity('skiper_cat_services')
export class SkiperCatService {

    @PrimaryGeneratedColumn() id: number;

    @Column({nullable: false, length:50}) name:string;

    @Column('text',{nullable: false}) url_img_service: string;
}
