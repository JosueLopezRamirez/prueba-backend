import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";
import { SkiperCommerce } from "../skiper-commerce/skiper-commerce.entity";
import { SkiperOrdersStatus } from "../skiper-orders-status/skiper-orders-status.dto";

@Entity()
export class SkiperOrder {

    @PrimaryGeneratedColumn() id: number;

    @Column({ nullable: true, length: 50 }) userphone: string;
    @Column({ nullable: true, length: 50 }) username: string;
    @Column({ nullable: true, length: 50 }) useraddress: string;
    @Column({ nullable: true, length: 11 }) orderstatus: string;
    @Column('date', { nullable: true }) orderdate: Date;
    @Column({ nullable: true }) total_price: number;
    @Column({ nullable: true }) num_item: number;

    @ManyToOne(type => User, { nullable: false })
    @JoinColumn({ name: 'id_user' }) user: User;

    @ManyToOne(type => SkiperCommerce, { nullable: false })
    @JoinColumn({ name: 'id_commerce' }) skiperCommerce: SkiperCommerce;

    @ManyToOne(type => SkiperOrdersStatus, { nullable: false })
    @JoinColumn({ name: 'idorderstatus' }) skiperOrderStatus: SkiperOrdersStatus;

}
