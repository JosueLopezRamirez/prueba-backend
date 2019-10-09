import { Entity, Column, PrimaryGeneratedColumn,JoinColumn, ManyToOne, BeforeInsert } from 'typeorm';
import { Min, Length, IsOptional, ValidateNested } from 'class-validator';
import { Countrie } from '../countries/countrie.entity';
import { Cities } from '../cities/cities.entity';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn() id: number;

    @Column({nullable:false,length:100})
    @Length(100) firstname: string;

    @Column({nullable:false,length:100})
    @Length(100) lastname: string;

    @Column({nullable:false,unique:true,length:100})
    @Length(100) email: string;

    @Column({nullable:true,length:50})
    @Length(50) user: string;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password,parseInt(process.env.SALT));
    }

    @Column({length:255})
    @Min(8, { message: 'the password must be have 8 characters at least' })
    @Length(255) password: string;
    
    @Column({nullable:true,default: -1})
    @IsOptional() sponsor_id: number;

    @Column({nullable:true,length:255})
    @Length(255) address: string;
    
    @Column({nullable:false,length: 100}) phone: string;

    @BeforeInsert()
    defaultCreateAt(){
        if(this.create_at==null){
            this.create_at = new Date();
        }
    }

    @Column('date',{nullable:true}) create_at: Date;
    
    @ManyToOne(type => Countrie,{nullable:false})
    @JoinColumn({name: 'idcountry'})
    @ValidateNested() country:Countrie;

    @ManyToOne(type => Cities,{nullable:false})
    @JoinColumn({name: 'idcity'})
    @ValidateNested() city:Cities;
}