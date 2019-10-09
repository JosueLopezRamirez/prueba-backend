import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { SupportTicketService } from './support-ticket.service';
import { SupportTicketInput } from './suppor.ticket.dto';

@Resolver('SupportTicket')
export class SupportTicketResolver {
    constructor(private readonly supportTicketService: SupportTicketService) { }

    @Query('supporttickets')
    async supporttickets() {
        return this.supportTicketService.getAll();
    }

    @Mutation('registerSupportTicket')
    async registerSupportTicket(@Args('input') input: SupportTicketInput) {
        return this.supportTicketService.registerSupportTicket(input);
    }
}
