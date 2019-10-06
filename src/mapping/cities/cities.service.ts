import { Injectable } from '@nestjs/common';
import { Cities } from './cities.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {

    constructor(@InjectRepository(Cities) private countrieRepository: Repository<Cities>) { }

    async getAll(): Promise<Cities[]> {
        return await this.countrieRepository.find({relations:["country"]});
    }

    async getById(id:number):Promise<Cities>{
        return await this.countrieRepository.findOne({
            where:{id:id},
            relations:["country"]
        })
    }
}
