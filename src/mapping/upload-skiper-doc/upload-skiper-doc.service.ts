import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadSkiperDoc } from './upload-skiper-doc.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadSkiperDocService {

    constructor(
        @InjectRepository(UploadSkiperDoc) private readonly respository:Repository<UploadSkiperDoc>,
    ){}

    async getAll(): Promise<UploadSkiperDoc[]>{
        return await this.respository.find();
    }

    async getById(_id: number): Promise<UploadSkiperDoc>{
        return await this.respository.findOne({
            where:{id:_id}
        });
    }

    async create(agent: UploadSkiperDoc): Promise<UploadSkiperDoc>{
        return await this.respository.save(agent);
    }

    async delete(agent: UploadSkiperDoc){
        return await this.respository.delete(agent);
    }
}
