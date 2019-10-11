import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class UploadVehicleLegalDoc {
    
    @PrimaryGeneratedColumn() id:number;
    @Column('longtext', { nullable: true }) url_img_insurance: string;
    @Column('longtext', { nullable: true }) url_img_vehicle_circulation: string;
    @Column('longtext', { nullable: true }) url_img_mechanical_inspection: string;
    @Column('longtext', { nullable: true }) url_img_gas_emission: string;
    @Column('longtext', { nullable: true }) url_img_license_plate: string;

    //Esperando a la llave foranea de skiper_vehicle

}
