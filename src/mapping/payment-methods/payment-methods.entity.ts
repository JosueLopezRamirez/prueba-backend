import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('payment_methods')
export class PaymentMethods {
    @PrimaryGeneratedColumn() id: number;

    @Column('varchar', { nullable: false, length: 30 }) name: string;

    @Column('boolean') pay_commissions: boolean;
}