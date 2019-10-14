import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryAgentService } from './category-agent.service';
import { categoryDto } from './category-agent.dto';

@Resolver('CategoryAgent')
export class CategoryAgentResolver {

    constructor(private categoryServices: CategoryAgentService){}

    @Query()
    async categoriesAgents(){
        return await this.categoryServices.getAll();
    }

    @Query()
    getByCategoryAgentIdAndCityId(@Args('id')id:number,@Args('idcity')idcity:number){
        return this.categoryServices.getByCategoryAgentIdAndCityId(id,idcity);
    }
}