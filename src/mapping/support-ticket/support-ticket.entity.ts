import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";

import { TicketCategory } from "../ticket-category/ticket-category.entity";
import { KindTicket } from "../kind-ticket/kind-ticket.entity";
import { User } from "../users/user.entity";
import { Apps } from "../apps/apps.entity";
import { TicketPriority } from "../ticket-priority/ticket-priority.entity";
import { TicketStatus } from "../ticket-status/ticket-status.entity";

@Entity()
export class SupportTicket {

    @PrimaryGeneratedColumn() id: number;

    @Column({ nullable: true,length: 80 }) title: string;

    @Column('longtext', { nullable: false }) description: string;

    @Column('date', { nullable: false }) update_at: Date;

    @Column('date', {nullable: false }) created_at: Date;

    @Column({ nullable: false }) asigned_id: number;

    @ManyToOne(type => TicketCategory, {nullable: false})
    @JoinColumn({ name:'id_category' }) categoryID: TicketCategory;

    @ManyToOne(type => KindTicket, {nullable: false})
    @JoinColumn({name:'id_kind'}) kindID: KindTicket;

    @ManyToOne(type => User, {nullable:false})
    @JoinColumn({name: 'id_user'}) userID: User;

    @ManyToOne(type => Apps, {nullable: false})
    @JoinColumn({name:'id_app'}) appID: Apps;

    @ManyToOne(type => TicketPriority, {nullable: false})
    @JoinColumn({name:'id_priority'}) priorityID: TicketPriority;

    @ManyToOne(type => TicketStatus,{nullable:false})
    @JoinColumn({name: 'id_status'}) statusID: TicketStatus;

}
