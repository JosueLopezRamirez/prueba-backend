import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { SkiperDriverSchedule } from "../skiper-driver-schedule/skiper-driver-schedule.entity";
import { SkiperCatTravel } from "../skiper-cat-travels/skiper-cat-travel.entity";

@Entity('skiper_tariffs')
export class SkiperTariffs {

    @PrimaryGeneratedColumn() id: number;

    @Column('decimal', { nullable: false }) price_base: number;
    @Column('decimal', { nullable: false }) price_minute: number;
    @Column('decimal', { nullable: false }) price_kilometer: number;
    @Column('decimal', { nullable: false }) price_minimum: number;

    @ManyToOne(type => SkiperDriverSchedule, { nullable: false })
    @JoinColumn({ name: 'id_driver_shedule' }) driverShedule: SkiperDriverSchedule;

    @ManyToOne(type => SkiperCatTravel, { nullable: false })
    @JoinColumn({ name: 'id_skiper_cat_travel' }) skiperCatTravel: SkiperCatTravel;
}
