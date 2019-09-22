import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkiperDetailCommerce } from '../skiper-detail-commerce/skiper-detail-commerce.entity';
import { Repository } from 'typeorm';
import { UploadCommerceDoc } from './upload-commerce-doc.entity';

@Injectable()
export class UploadCommerceDocService {

    constructor(
        @InjectRepository(UploadCommerceDoc) private readonly respository:Repository<UploadCommerceDoc>,
    ){}

    async getAll(): Promise<UploadCommerceDoc[]>{
        return await this.respository.find();
    }

    async getById(_id: number): Promise<UploadCommerceDoc>{
        return await this.respository.findOne({
            where:{id:_id}
        });
    }

    async create(agent: UploadCommerceDoc): Promise<UploadCommerceDoc>{
        return await this.respository.save(agent);
    }

    async delete(agent: UploadCommerceDoc){
        return await this.respository.delete(agent);
    }
}