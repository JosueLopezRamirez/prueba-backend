import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('skiper_cat_travel')
export class SkiperCatTravel {
    @PrimaryGeneratedColumn() id: number;
    @Column({ length: 80, nullable: true }) name: string;
    @Column('longtext', { nullable: true }) url_img_category: string;
}