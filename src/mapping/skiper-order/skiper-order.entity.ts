import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";
import { SkiperCommerce } from "../skiper-commerce/skiper-commerce.entity";
import { SkiperOrdersStatus } from "../skiper-orders-status/skiper-orders-status.entity";

@Entity()
export class SkiperOrder {

    @PrimaryGeneratedColumn() id: number;

    @Column('varchar', { nullable: true, length: 50 }) userphone: string;
    @Column('varchar', { nullable: true, length: 50 }) useraddress: string;
    @Column('datetime', { nullable: true }) orderdate: Date;
    @Column('double', { nullable: true }) totalprice: number;
    @Column('int', { nullable: true }) numitem: number;

    @ManyToOne(type => User, { nullable: false })
    @JoinColumn({ name: 'iduser' }) user: User;

    @ManyToOne(type => SkiperCommerce, { nullable: false })
    @JoinColumn({ name: 'idcommerce' }) skiperCommerce: SkiperCommerce;
}
