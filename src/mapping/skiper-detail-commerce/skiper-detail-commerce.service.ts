import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkiperDetailCommerce } from './skiper-detail-commerce.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkiperDetailCommcerceService {

    constructor(@InjectRepository(SkiperDetailCommerce) readonly repository: Repository<SkiperDetailCommerce>){}

    async getAll(): Promise<SkiperDetailCommerce[]>{
        return await this.repository.find();
    }

    async getById(_id: number): Promise<SkiperDetailCommerce>{
        return await this.repository.findOne({id:_id});
    }

    async create(agent: SkiperDetailCommerce): Promise<SkiperDetailCommerce>{
        return await this.repository.save(agent);
    }

    async delete(agent: SkiperDetailCommerce){
        return await this.repository.delete(agent);
    }
}