import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('skiper_cat_travels')
export class SkiperCatTravel {
    @PrimaryGeneratedColumn() id: number;
    @Column({ length: 80, nullable: true }) name: string;
    @Column('longtext', { nullable: true }) url_img_category: string;
    @Column('varchar', { nullable: true, length: 15 }) mode_drive: string;
}