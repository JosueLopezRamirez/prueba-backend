import { Injectable } from '@nestjs/common';
import { SkiperAgentDriver } from './skiper-agent-driver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SkiperAgentDriverService {

    constructor(
        @InjectRepository(SkiperAgentDriver)private readonly repoAgent:Repository<SkiperAgentDriver>,
    ){}

    async getAll(): Promise<SkiperAgentDriver[]>{
        return await this.repoAgent.find();
    }

    async getById(_id: number): Promise<SkiperAgentDriver>{
        return await this.repoAgent.findOne({
            where:{id:_id}
        });
    }

    async create(agent: SkiperAgentDriver): Promise<SkiperAgentDriver>{
        return await this.repoAgent.save(agent);
    }

    async delete(agent: SkiperAgentDriver){
        return await this.repoAgent.delete(agent);
    }
}
