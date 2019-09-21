import { Injectable } from '@nestjs/common';
import { SkiperAgentCommerce } from './skiper-agent-commerce.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentCommerceDto } from './skiper-agent-commerce.dto';

@Injectable()
export class SkiperAgentCommerceService {

    constructor(
        @InjectRepository(SkiperAgentCommerce)private readonly repoAgent:Repository<SkiperAgentCommerce>,
    ){}

    async getAll(): Promise<SkiperAgentCommerce[]>{
        return await this.repoAgent.find();
    }

    async getById(_id: number): Promise<SkiperAgentCommerce>{
        return await this.repoAgent.findOne({
            where:{id:_id}
        });
    }

    async create(agent: SkiperAgentCommerce): Promise<SkiperAgentCommerce>{
        return await this.repoAgent.save(agent);
    }

    async delete(agent: SkiperAgentCommerce){
        return await this.repoAgent.delete(agent);
    }
}