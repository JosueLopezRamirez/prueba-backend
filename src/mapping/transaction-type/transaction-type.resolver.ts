import { Resolver, Query, Args } from '@nestjs/graphql';
import { TransactionTypeService } from './transaction-type.service';
import { ParseIntPipe } from '@nestjs/common';


@Resolver('TransactionType')
export class TransactionTypeResolver {
    constructor(
        private readonly serviceTransactionType:TransactionTypeService
    ){}

    @Query('TransactionType')
    async TransactionType(){
        return await this.serviceTransactionType.getAll();
    }

    @Query()
    async searchTransactionType(@Args('id', ParseIntPipe) id:number){
        return this.serviceTransactionType.getById(id);
    }
}
