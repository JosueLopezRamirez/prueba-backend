import { Resolver, Query } from '@nestjs/graphql';
import { SkiperAgentDriverService } from './skiper-agent-driver.service';
import { AgentDriverDto } from './dto';

@Resolver('SkiperAgentDriver')
export class SkiperAgentDriverResolver {

    constructor(
        private readonly skiperService:SkiperAgentDriverService
    ){}

    @Query(() => [AgentDriverDto])
    async drivers(){
        return await this.skiperService.getAll();
    }
}
