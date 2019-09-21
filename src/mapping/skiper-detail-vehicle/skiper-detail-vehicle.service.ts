import { Injectable } from '@nestjs/common';
import { SkiperDetailVehicle } from './skiper-detail-vehicle.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SkiperDetailVehicleService {

    constructor(@InjectRepository(SkiperDetailVehicle) readonly repository: Repository<SkiperDetailVehicle>){}

    async getAll(): Promise<SkiperDetailVehicle[]>{
        return await this.repository.find();
    }

    async getById(_id: number): Promise<SkiperDetailVehicle>{
        return await this.repository.findOne({id:_id});
    }

    async create(agent: SkiperDetailVehicle): Promise<SkiperDetailVehicle>{
        return await this.repository.save(agent);
    }

    async delete(agent: SkiperDetailVehicle){
        return await this.repository.delete(agent);
    }
}
