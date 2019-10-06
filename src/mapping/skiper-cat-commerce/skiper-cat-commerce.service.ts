import { Injectable } from '@nestjs/common';
import { SkiperCatCommerce } from './skiper-cat-commerce.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SkiperCatCommerceService {

    constructor(
        @InjectRepository(SkiperCatCommerce) private readonly repository:Repository<SkiperCatCommerce>
    ){}

    async getAll():Promise<SkiperCatCommerce[]>{
        return await this.repository.find();
    }

    async getById(id:number):Promise<SkiperCatCommerce>{
        return await this.repository.findOne({id});
    }
}
