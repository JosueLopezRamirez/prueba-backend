import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { CountryPaymentCurrency } from '../country-payment-currency/country-payment-currency.entity';

@Entity('payment_methods')
export class PaymentMethods {
    @PrimaryGeneratedColumn() id: number;

    @Column('varchar', { nullable: false, length: 30 }) name: string;

    @Column('boolean') pay_commissions: boolean;

    @OneToMany(type => CountryPaymentCurrency, x => x.paymentmethod) countrypayment: CountryPaymentCurrency[];
}