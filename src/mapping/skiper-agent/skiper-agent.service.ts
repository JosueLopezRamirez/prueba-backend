import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkiperAgent } from './skiper-agent.entity';
import { Repository } from 'typeorm';
import { AgentInput } from './skiper-agent.dto';
import { UserService } from '../users/user.service';
import { CategoryAgentService } from '../category-agent/category-agent.service';
import { User } from '../users/user.entity';

@Injectable()
export class SkiperAgentService {

    constructor(
        @InjectRepository(SkiperAgent) private agentRepository: Repository<SkiperAgent>,
        private readonly userService: UserService,
        private readonly categoryAgentService: CategoryAgentService
    ) { }

    async getAll() {
        return await this.agentRepository.find({ relations: ["user", "categoryAgent"] });
    }

    async getById(id: number) {
        return await this.agentRepository.findOne({
            relations: ["user", "categoryAgent"],
            where: { id: id }
        });
    }

    async getByUser(user: User) {
        try {
            return await this.agentRepository.findOne({
                where: { user: user }
            });
        } catch (error) {
            console.log(error)
        }
    }


    async register(agent: AgentInput) {
        try {
            console.log(agent.user_id)
            let user = await this.userService.findById(agent.user_id);
            let category = await this.categoryAgentService.getById(agent.categoryAgent_id);
            if (user !== undefined && category !== undefined) {
                let agentInsert: SkiperAgent = this.parseAgent(agent, user, category);
                return await this.agentRepository.save(agentInsert);
            }
        } catch (error) {
            console.log(error)
        }
    }

    async update(agent: AgentInput) {
        try {
            let agentUpdate = await this.getById(agent.id);
            if (agentUpdate !== undefined) {
                agentUpdate.state = agent.state;
                return await this.agentRepository.save(agentUpdate);
            }

        } catch (error) {
            console.log(error)
        }
    }

    private parseAgent(input: AgentInput, user?, category?): SkiperAgent {
        let agent: SkiperAgent = new SkiperAgent();
        agent.identity = input.identity;
        agent.state = input.state;
        agent.create_at = input.create_at;
        agent.user = user;
        agent.categoryAgent = category;
        return agent;
    }
}