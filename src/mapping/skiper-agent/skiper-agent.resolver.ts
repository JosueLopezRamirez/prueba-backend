import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SkiperAgentService } from './skiper-agent.service';
import { SkiperAgentDto, AgentInput } from './skiper-agent.dto';

@Resolver('SkiperAgent')
export class SkiperAgentResolver {

    constructor(
        private agentService :SkiperAgentService
    ){}

    @Query(() => [SkiperAgentDto])
    async agents(){
        return this.agentService.getAll();
    }

    @Mutation('registerAgent')
    async registerAgent(@Args('input') input: AgentInput){
        return this.agentService.register(input);
    }
}
