import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Cities } from "../cities/cities.entity";
import { CountryPaymentCurrency } from "../country-payment-currency/country-payment-currency.entity";


@Entity('countries')
export class Countrie {

    @PrimaryGeneratedColumn() id: number;

    @Column({ length: 2, nullable: false }) iso: string;

    @Column({ length: 80, nullable: false }) name: string;

    @Column({ length: 80, nullable: false }) nicename: string;

    @Column({ length: 3, nullable: true }) iso3: string;

    @Column('longtext', { nullable: true }) flag: string;

    @Column({ type: "smallint", nullable: true }) numcode: number;

    @Column({ type: "int", nullable: false }) phonecode: number;

    @OneToMany(type => Cities, x => x.country)
    cities: Cities[];

    @OneToMany(type => CountryPaymentCurrency, x => x.countrie)
    countrypaymentcurrency: CountryPaymentCurrency[];
}