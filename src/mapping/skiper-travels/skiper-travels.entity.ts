import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { SkiperAgent } from '../skiper-agent/skiper-agent.entity';

@Entity('skiper_travels')
export class SkiperTravels {
    @PrimaryGeneratedColumn() id: number;
<<<<<<< HEAD
    @Column('int', {nullable: true}) idusers: number;
    @Column('int', {nullable: true}) iddriver: number;
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
=======
    @Column('double', { nullable: true }) lat_initial: number;
    @Column('double', { nullable: true }) lng_initial: number;
    @Column('double', { nullable: true }) lat_final_seggested: number;
    @Column('double', { nullable: true }) lng_final_seggested: number;
    @Column('double', { nullable: true }) lat_final: number;
    @Column('double', { nullable: true }) lng_final: number;
    @Column('datetime', { nullable: true }) date_init: Date;
    @Column('datetime', { nullable: true }) date_final: Date;
    @Column('double', { nullable: true }) distance: number;
    @Column('double', { nullable: true }) total: number;
    @Column({ nullable: true, length: 100 }) address_initial: string;
    @Column({ nullable: true, length: 100 }) address_final: string;
    @Column({ nullable: true, length: 100 }) address_suggested: string;

    @Column({ nullable: true }) iduser: number;
    @Column({ nullable: true }) iddriver: number;
>>>>>>> 4cd42b4875139c812413e6c89523e530fb610f7f

    @ManyToOne(type => User, { nullable: true })
    @JoinColumn({ name: 'iduser' }) users: User;

    @ManyToOne(type => SkiperAgent, { nullable: true })
    @JoinColumn({ name: 'iddriver' }) skiperagent: SkiperAgent;
}