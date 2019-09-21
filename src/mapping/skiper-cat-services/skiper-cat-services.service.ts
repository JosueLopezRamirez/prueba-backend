import { Injectable } from '@nestjs/common';
import { SkiperCatService } from './skiper-cat-service.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SkiperCatServicesService {

    constructor(
        @InjectRepository(SkiperCatService)private readonly repository:Repository<SkiperCatService>,
    ){}

    async getAll(): Promise<SkiperCatService[]>{
        return await this.repository.find();
    }

    async getById(_id: number): Promise<SkiperCatService>{
        return await this.repository.findOne({
            where:{id:_id}
        });
    }

    async create(agent: SkiperCatService): Promise<SkiperCatService>{
        return await this.repository.save(agent);
    }

    async delete(agent: SkiperCatService){
        return await this.repository.delete(agent);
    }

}
