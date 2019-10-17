import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SkiperAgentService } from './skiper-agent.service';
import { SkiperAgentDto, AgentInput } from './skiper-agent.dto';
import { AuthGuard } from '../../shared/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver('SkiperAgent')
export class SkiperAgentResolver {

    constructor(
        private agentService :SkiperAgentService
    ){}

    @Query(() => [SkiperAgentDto])
    async agents(){
        return this.agentService.getAll();
    }

    @Mutation()
    async registerAgent(@Args('input') input: AgentInput){
        return this.agentService.register(input);
    }

    @UseGuards(new AuthGuard())
    @Mutation()
    async updateAgent(@Args('input') input: AgentInput){
        return this.agentService.update(input);
    }
}
