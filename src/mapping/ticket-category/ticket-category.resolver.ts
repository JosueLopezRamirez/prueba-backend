import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { TicketCategoryService } from './ticket-category.service';
import { TicketCategoryInput } from './ticket-category.dto';

@Resolver('TicketCategory')
export class TicketCategoryResolver {
    constructor(
        private readonly ticketCategoryService: TicketCategoryService
    ){}

    @Query('ticketcategories')
    async ticketcategories() {
        return this.ticketCategoryService.getAll();
    }

    @Mutation('registerTicketCategory')
    async registerTicketCategory(@Args('input') input: TicketCategoryInput){
        return this.ticketCategoryService.registerTicketCategory(input);
    }
}
