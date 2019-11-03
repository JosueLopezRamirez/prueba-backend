<<<<<<< HEAD
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
=======
import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Column } from 'typeorm';
import { SkiperCommerce } from '../skiper-commerce/skiper-commerce.entity';
import { User } from '../users/user.entity';

@Entity('skiper_commerce_favorites')
export class SkiperCommerceFavorite {

    @PrimaryGeneratedColumn() id :number;

    @Column({nullable:false}) iduser:number;

    @Column({nullable:false}) idcommerce:number;

    @ManyToOne(type => User,{nullable:false})
    @JoinColumn({name:'iduser'}) user:User;

    @ManyToOne(type => SkiperCommerce, { nullable: false })
    @JoinColumn({ name: 'idcommerce' }) skiperCommerce: SkiperCommerce;

>>>>>>> 7a79b878b592a7c3ea50f4502a9a1462e62f1431
}
