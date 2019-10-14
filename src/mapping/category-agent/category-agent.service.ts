import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder } from 'typeorm';
import { CategoryAgent } from './categoty-agent.entity';

@Injectable()
export class CategoryAgentService {
    
    constructor(
        @InjectRepository(CategoryAgent) private readonly repository:Repository<CategoryAgent>
    ){}

    async getAll(): Promise<CategoryAgent[]>{
        return await this.repository.find();
    }

    async getByCategoryAgentIdAndCityId(id:number,idcity:number){
        try {
            let result = await createQueryBuilder("CategoryAgent")
            .innerJoinAndSelect("CategoryAgent.agents","SkiperAgent")
            .innerJoinAndSelect("SkiperAgent.user","User")
            .innerJoinAndSelect("User.city","Cities")
            .where("CategoryAgent.id = :id",{id})
            .andWhere("User.idcity = :idcity",{idcity})
            .getMany();
            result.forEach(item => console.log(item))
            // console.log(result);
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id:number): Promise<CategoryAgent>{
        return await this.repository.findOne({ id });
    }
}
