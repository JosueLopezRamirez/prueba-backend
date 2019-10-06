import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class SkiperCatCommerce {
    
    @PrimaryGeneratedColumn() id: number;

    @Column('varchar',{length:50,nullable:false}) name:string;

    @Column('longtext',{nullable:false}) url_img_category:string;
}
