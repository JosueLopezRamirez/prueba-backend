import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
// import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column() firstname: string;

    @Column() lastname: string;

    @Column({ length: 100}) email: string;

    @Column({ length: 50}) user: string;

    // @BeforeInsert()
    // async hashPassword() {
    //     this.password = await bcrypt.hash(this.password,10);
    // }

    @Column() password: string;
    
    @Column({nullable:true, default: 0}) sponsor_id: number;

    @Column() country: string;

    @Column({length: 100}) phone: string;

    @Column({default: Date.now()}) create_at: string;
}