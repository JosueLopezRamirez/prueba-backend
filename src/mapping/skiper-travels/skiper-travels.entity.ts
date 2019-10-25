import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Double } from 'typeorm';
import { User } from '../users/user.entity';
import { SkiperAgent} from '../skiper-agent/skiper-agent.entity';

@Entity('skiper_travels')
export class SkiperTravels{
    @PrimaryGeneratedColumn() id: number;
    @Column({nullable: true}) idusers: number;
    @Column({nullable: true}) iddriver: number;
    @Column('double', {nullable: true}) lat_initial: Double;
    @Column('double', {nullable: true}) lng_initial: Double;
    @Column('double', {nullable: true}) lat_final_seggested: Double;
    @Column('double', {nullable: true}) lng_final_seggested: Double;
    @Column('double', {nullable: true}) lat_final: Double;
    @Column('double', {nullable: true}) lng_final: Double;
    @Column('datetime', {nullable: true}) date_init: Date;
    @Column('datetime', {nullable: true}) date_final: Date;
    @Column('double', {nullable: true}) distance: Double;
    @Column('double', {nullable: true}) total: Double;
    @Column({nullable: true, length: 100}) address_initial: string;
    @Column({nullable: true, length: 100}) address_final: string;
    @Column({nullable: true, length: 100}) address_suggested: string;

    @ManyToOne(type => User, { nullable: true })
    @JoinColumn({name: 'idusers'}) users: User;

    @ManyToOne(type => SkiperAgent, { nullable: true })
    @JoinColumn({name: 'iddriver'}) skiperagent: SkiperAgent;
}
