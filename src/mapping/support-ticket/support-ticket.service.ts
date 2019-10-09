import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SupportTicketInput } from './suppor.ticket.dto';
import { SupportTicket } from './support-ticket.entity';

import { UserService } from '../users/user.service';
import { AppsService } from '../apps/apps.service';
import { KindTicketService } from '../kind-ticket/kind-ticket.service';
import { TicketCategoryService } from '../ticket-category/ticket-category.service';
import { TicketPriorityService } from '../ticket-priority/ticket-priority.service';
import { TicketStatusService } from '../ticket-status/ticket-status.service';


@Injectable()
export class SupportTicketService {
    constructor (
        @InjectRepository(SupportTicket) 
        private readonly repository: Repository<SupportTicket>,
        private readonly appsService: AppsService,
        private readonly userService: UserService,
        private readonly kindTicketService: KindTicketService,
        private readonly ticketCategoryService: TicketCategoryService,
        private readonly ticketPriorityService: TicketPriorityService,
        private readonly ticketStatusService: TicketStatusService
    ) {}

    async getAll():Promise<SupportTicket[]>{
        return await this.repository.find({ relations:["categoryID","kindID","userID","appID","priorityID","statusID"]});
    }

    async getById(id:number):Promise<SupportTicket> {
        return await this.repository.findOne({
            relations:["categoryID","kindID","userID","appID","priorityID","statusID"],
            where:{ id }
        });
    }

    async registerSupportTicket(input: SupportTicketInput): Promise<SupportTicket> {
        try
        {
            let user = await this.userService.findById(input.userID);
            let app = await this.appsService.getById(input.appID);
            let kind = await this.kindTicketService.getById(input.kindID);
            let category = await this.ticketCategoryService.getById(input.categoryID);
            let priority = await this.ticketPriorityService.getById(input.priorityID);
            let status = await this.ticketStatusService.getById(input.statusID);

            if(user !== undefined && app !== undefined && kind !== undefined && category !== undefined && priority !== undefined && status !== undefined ) {
                let supportticket = this.parseSupportTicket(input, user, app, kind, category, priority, status);
                console.log(supportticket);
                return this.repository.save(supportticket);
            }
        }
        catch (error) {
            console.error(error);
        }
        return null;
    }

    private parseSupportTicket (input: SupportTicketInput, user?, app?, kind?, category?, priority?, status?):SupportTicket {
        let supportticket: SupportTicket = new SupportTicket();
        supportticket.title = input.title;
        supportticket.description = input.description;
        supportticket.update_at = input.update_at;
        supportticket.created_at = input.created_at;
        supportticket.asigned_id = input.asigned_id;
        supportticket.categoryID = category;
        supportticket.kindID = kind;
        supportticket.userID = user;
        supportticket.appID = app;
        supportticket.priorityID = priority;
        supportticket.statusID = status;
        return supportticket;
    }
}
