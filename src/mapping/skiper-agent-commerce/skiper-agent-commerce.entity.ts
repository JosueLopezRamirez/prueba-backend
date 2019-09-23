import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn} from "typeorm";
import { User } from "../users/user.entity";

@Entity({name: 'skiper_agent_commerce'})
export class SkiperAgentCommerce {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({length: 80,nullable:false})
    name_owner:string;

    @Column({length: 100,nullable:false})
    identity:string;

    @Column('text')
    url_doc_identity: string;

    @Column({nullable:true})
    state: boolean;

    @ManyToOne(type => User,user => user.skiperCommerce,{nullable:false})
    @JoinColumn({name:'iduser'})
    user: User;
}
