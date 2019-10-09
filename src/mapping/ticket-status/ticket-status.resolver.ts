import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { TicketStatusService } from './ticket-status.service';
import { TicketStatusInput } from './ticket-status.dto';

@Resolver('TicketStatus')
export class TicketStatusResolver {
    constructor(
        private readonly ticketStatusService: TicketStatusService
    ){}

    @Query('ticketstatus')
    async ticketstatus() {
        return this.ticketStatusService.getAll();
    }

    @Mutation('registerTicketStatus')
    async registerTicketStatus(@Args('input') input: TicketStatusInput){
        return this.ticketStatusService.registerTicketStatus(input);
    }
}
