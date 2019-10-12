import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { SkiperCatTravel } from "../skiper-cat-travels/skiper-cat-travel.entity";
import { VehicleCatalog } from "../vehicle-catalog/vehicle-catalog.entity";
import { VehicleTrademark } from "../vehicle-trademarks/vehicle-trademark.entity";
import { VehicleModels } from "../vehicle-models/vehicle-models.entity";
import { VehicleYears } from "../vehicle-years/vehicle-years.entity";

@Entity()
export class SkiperVehicle {

    @PrimaryGeneratedColumn() id:number;

    @Column('varchar',{nullable:true,length:30}) license_plate:string;

    @Column({nullable: true}) lat: string;

    @Column({nullable: true}) lon: string;

    @ManyToOne(type => SkiperCatTravel, {nullable: false})
    @JoinColumn({name:'id_cat_travel'}) skiperCatTravel: SkiperCatTravel;

    @ManyToOne(type => VehicleCatalog, {nullable: false})
    @JoinColumn({name:'id_vehicle_catalog'}) vehicleCatalog: VehicleCatalog;

    @ManyToOne(type => VehicleTrademark, {nullable: false})
    @JoinColumn({name:'idtrademark'}) vehicleTrademark: VehicleTrademark;

    @ManyToOne(type => VehicleModels, {nullable: false})
    @JoinColumn({name:'idmodel'}) vehicleModel: VehicleModels;

    @ManyToOne(type => VehicleYears, {nullable: false})
    @JoinColumn({name:'idyear'}) vehicleYear: VehicleYears;
    
}
