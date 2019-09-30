import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Countrie } from './countrie.entity';
import { Repository } from 'typeorm';
import {paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';

@Injectable()
export class CountrieService {

    constructor(@InjectRepository(Countrie) private countrieRepository: Repository<Countrie>) { }

    //Obtener unicamente los nombres y los codigos de telefono de los paises
    async getAllCountries(): Promise<Countrie[]>{
        return await this.countrieRepository.find();
    }
    
    async getById(id:number){
        return await this.countrieRepository.findOne({
            where:{id:id}
        })
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Countrie>> {
        return await paginate<Countrie>(this.countrieRepository, options);
    }
}
