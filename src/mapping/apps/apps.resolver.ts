import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AppsService } from './apps.service';
import { AppsInput } from './apps.dto';

@Resolver('Apps')
export class AppsResolver {
    constructor(
        private readonly appsService: AppsService
    ){}

    @Query('apps')
    async apps() {
        return this.appsService.getAll();
    }

    @Mutation('registerApp')
    async registerApp(@Args('input') input: AppsInput){
        return this.appsService.registerApp(input);
    }
}
