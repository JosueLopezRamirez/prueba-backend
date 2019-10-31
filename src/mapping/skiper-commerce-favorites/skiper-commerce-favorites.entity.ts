import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { SkiperCommerce } from '../skiper-commerce/skiper-commerce.entity';


@Entity('skiper_commerce_favorites')
export class SkiperCommerceFavorite {
    @PrimaryGeneratedColumn() id: number;
    @Column({ nullable: false }) iduser: number;
    @Column({ nullable: false }) idcommerce: number;

    @ManyToOne(type => User, { nullable: false })
    @JoinColumn({ name: 'iduser' }) user: User;

    @ManyToOne(type => SkiperCommerce, { nullable: false })
    @JoinColumn({ name: 'idcommerce' }) skipercommerce: SkiperCommerce;
}
