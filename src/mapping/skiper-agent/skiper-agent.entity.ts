import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { IsNotEmpty, IsBoolean, IsString, IsDate } from "class-validator";
import { CategoryAgent } from "../category-agent/categoty-agent.entity";
import { User } from "../users/user.entity";

@Entity()
export class SkiperAgent {

    @PrimaryGeneratedColumn() id:number;

    @Column('boolean',{nullable:false})
    @IsNotEmpty()
    @IsBoolean()
    state:boolean;

    @Column('varchar',{nullable:false,length:80})
    @IsNotEmpty()
    @IsString()
    identity:string;

    @Column('date',{nullable:false})
    @IsNotEmpty()
    @IsDate()
    create_at:Date;

    @ManyToOne(type => CategoryAgent,{nullable:false})
    @JoinColumn({name: 'idcategory_agent'}) categoryAgent:CategoryAgent;

    @ManyToOne(type => User,{nullable:false})
    @JoinColumn({name:'iduser'}) user:User;
}