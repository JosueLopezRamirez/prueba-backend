import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { TicketPriorityService } from './ticket-priority.service';
import { TicketPriorityInput } from './ticket-priority.dto';

@Resolver('TicketPriority')
export class TicketPriorityResolver {
    constructor(
        private readonly ticketPriorityService: TicketPriorityService
    ){}

    @Query('ticketpriorities')
    async ticketpriorities() {
        return this.ticketPriorityService.getAll();
    }

    @Mutation('registerTicketPriority')
    async registerTicketPriority(@Args('input') input: TicketPriorityInput){
        return this.ticketPriorityService.registerTicketPriority(input);
    }
}
