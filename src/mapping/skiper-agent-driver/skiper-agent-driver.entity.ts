import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";

@Entity({name: 'skiper_agent_driver'})
export class SkiperAgentDriver {


    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    state:boolean;

    // @Column({length: 50,nullable:false})
    // category: string;

    @Column({nullable:true})
    has_reflective_vest: boolean;

    @Column('text')
    url_doc_identity:string;

    @Column('text')
    url_doc_letterone_recomendation:string;

    @Column('text')
    url_doc_lettertwo_recomendation:string;

    @Column('text')
    url_doc_verify_identity:string;

    @Column('text',{nullable:true})
    url_doc_driver_licence:string;

    @Column('text')
    url_doc_police_record:string;

    @Column('text')
    url_doc_driving_record:string;

    @ManyToOne(type => User,user => user.SkiperDriver,{nullable:false}) user: User;
}