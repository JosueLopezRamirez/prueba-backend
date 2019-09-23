import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { SkiperDetailVehicle } from "../skiper-detail-vehicle/skiper-detail-vehicle.entity";

@Entity('upload_skiper_doc')
export class UploadSkiperDoc {

    @PrimaryGeneratedColumn() id : number;

    @Column('text') url_doc_insurance:string;
    
    @Column('text') url_doc_vehicle_circulation:string;
    
    @Column('text') url_doc_mechanical_inspection:string;

    @Column('text') url_doc_gas_emission:string;

    @Column('text') url_doc_license_plate:string;

    @Column('text') url_doc_vehicle_front:string;

    @Column('text') url_doc_vehicle_behind:string;

    @Column('text') url_doc_vehicle_side_right:string;

    @Column('text') url_doc_vehicle_side_left:string;

    @Column('text') url_doc_vehicle_inside_one:string;

    @Column('text') url_doc_vehicle_inside_two:string;

    @Column('text') url_doc_vehicle_inside_three:string;

    @Column('text') url_doc_vehicle_inside_four:string;

    @ManyToOne(type => SkiperDetailVehicle,{nullable: false})
    @JoinColumn({name:'id_detail_vehicle'})
    skiper_detail_vehicle: SkiperDetailVehicle;
}
