import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryAgent } from './categoty-agent.entity';

@Injectable()
export class CategoryAgentService {
    
    constructor(
        @InjectRepository(CategoryAgent) private readonly repository:Repository<CategoryAgent>
    ){}

    async getAll(): Promise<CategoryAgent[]>{
        return await this.repository.find();
    }

    async getById(id:number): Promise<CategoryAgent>{
        return await this.repository.findOne({ id });
    }
}
