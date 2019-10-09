import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { KindTicketService } from './kind-ticket.service';
import { KindTicketInput } from './kind-ticket.dto';

@Resolver('KindTicket')
export class KindTicketResolver {
    constructor(
        private readonly kindTicketService: KindTicketService
    ){}

    @Query('kindtickets')
    async kindtickets() {
        return this.kindTicketService.getAll();
    }

    @Mutation('registerKindTicket')
    async registerKindTicket(@Args('input') input: KindTicketInput){
        return this.kindTicketService.registerKindTicket(input);
    }
}
