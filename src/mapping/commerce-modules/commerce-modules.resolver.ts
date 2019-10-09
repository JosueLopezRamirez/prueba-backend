import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CommerceModulesService } from './commerce-modules.service';
import { CommerceModuleInput } from './commerce-modules.dto';

@Resolver('CommerceModule')
export class CommerceModulesResolver {

    constructor ( 
        private readonly commerceModulesService: CommerceModulesService 
    ) { }

    @Query('commercemodule')
    async commercemodule() {
        return this.commerceModulesService.getAll();
    }

    @Mutation('registerCommerceModules')
    async registerCommerceModules(@Args('input') input: CommerceModuleInput) {
        return this.commerceModulesService.registerCommerceModules(input);
    }
}
