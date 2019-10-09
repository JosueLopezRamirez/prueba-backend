import { Resolver, Query, Args } from '@nestjs/graphql';
import { CommerceModulesService } from './commerce-modules.service';
import { ParseIntPipe } from '@nestjs/common';

@Resolver('CommerceModules')
export class CommerceModulesResolver {

    constructor(private readonly service:CommerceModulesService){}

    @Query()
    getAllCommerceModules(){
        return this.service.getAll();
    }

    @Query()
    getCommerceModuleById(@Args('id',ParseIntPipe) id:number){
        return this.service.getById(id);
    }

    @Query()
    getCommerceModulesWithPages(@Args('page',ParseIntPipe) page:number){
        return this.service.getAllWithPagination(page);
    }
}
