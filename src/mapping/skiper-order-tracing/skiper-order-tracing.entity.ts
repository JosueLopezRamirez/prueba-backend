import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { SkiperOrdersStatus } from "../skiper-orders-status/skiper-orders-status.entity";
import { SkiperOrder } from "../skiper-order/skiper-order.entity";

@Entity()
export class SkiperOrderTracing {

    @PrimaryGeneratedColumn() id:number;

    @ManyToOne(type => SkiperOrdersStatus, { nullable: false })
    @JoinColumn({ name: 'idorderstatus' }) orderStatus: SkiperOrdersStatus;

    @ManyToOne(type => SkiperOrder, { nullable: false })
    @JoinColumn({ name: 'idorder' }) order: SkiperOrder;
}
