import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';
import { SkiperAgentCommerce } from '../skiper-agent-commerce/skiper-agent-commerce.entity';

@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column() firstname: string;

    @Column() lastname: string;

    @Column({ length: 100}) email: string;

    @Column({ length: 50}) user: string;

    @Column() password: string;
    
    @Column({nullable:true, default: 0}) sponsor_id: number;

    @Column() country: string;

    @Column({length: 100}) phone: string;

    @Column({default: Date.now()}) create_at: string;

    @OneToMany(type => SkiperAgentCommerce, skiperAgent => skiperAgent.user)
    skiperCommerce: SkiperAgentCommerce[];
}