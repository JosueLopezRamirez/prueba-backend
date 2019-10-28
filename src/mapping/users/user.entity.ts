import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { Min, Length, IsOptional } from 'class-validator';
import { Countrie } from '../countries/countrie.entity';
import { Cities } from '../cities/cities.entity';
import * as bcrypt from 'bcryptjs';
import { UserCivilStatus } from '../user-civil-status/user-civil-status.entity';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn() id: number;

    @Column({ nullable: false, length: 100 })
    @Length(100) firstname: string;

    @Column({ nullable: false, length: 100 })
    @Length(100) lastname: string;

    @Column({ nullable: false, unique: true, length: 100 })
    @Length(100) email: string;

    @Column({ nullable: true, length: 50 })
    @Length(50) user: string;

    @BeforeInsert()
    // @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, parseInt(process.env.SALT));
    }

    @Column({ length: 255 })
    @Min(8, { message: 'the password must be have 8 characters at least' }) @Length(255) password: string;

    @Column({ nullable: true, default: 1 }) @IsOptional() sponsor_id: number;

    @Column({ nullable: true, length: 255 }) @Length(255) address: string;

    @Column({ nullable: false, length: 100 }) phone: string;

    @BeforeInsert()
    defaultCreateAt() {
        if (this.create_at == null) {
            this.create_at = new Date();
        }
        if(this.sponsor_id == null){
            this.sponsor_id = 1;
        }
        if(this.date_birth == null){
            this.date_birth = new Date();
        }
        if(this.is_online == null){
            this.is_online = false;
        }
    }

    @Column('date', { nullable: true }) create_at: Date;

    @Column('date', { nullable: false }) date_birth: Date;

    @Column('boolean', { nullable: true }) is_online: boolean;

    @Column('longtext',{ nullable: true}) avatar: string;

    @ManyToOne(type => Countrie, { nullable: false })
    @JoinColumn({ name: 'idcountry' }) country: Countrie;

    @ManyToOne(type => Cities, { nullable: true })
    @JoinColumn({ name: 'idcity' }) city: Cities;

    @ManyToOne(type => UserCivilStatus, { nullable: true })
    @JoinColumn({ name: 'idcivil_status' }) civilStatus: UserCivilStatus;

}