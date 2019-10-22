import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleTrademark } from './vehicle-trademark.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleTrademarksService {
    
    constructor(@InjectRepository(VehicleTrademark) private readonly repository:Repository<VehicleTrademark>){}

    async getAll(){
        return await this.repository.find();
    }

    async getById(id:number){
        return await this.repository.findOneOrFail({id});
    }
}
