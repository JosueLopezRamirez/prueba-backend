import { Injectable } from '@nestjs/common';
import { Cities } from './cities.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {

    constructor(@InjectRepository(Cities) private countrieRepository: Repository<Cities>) { }

    async getById(id:number){
        return await this.countrieRepository.findOne({
            where:{id:id}
        })
    }
}
