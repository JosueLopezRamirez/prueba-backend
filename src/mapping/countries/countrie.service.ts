import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Countrie } from './countrie.entity';
import { Repository } from 'typeorm';
import { countrieDto } from './countrie.dto';

@Injectable()
export class CountrieService {

    constructor(@InjectRepository(Countrie) private countrieRepository: Repository<Countrie>) { }

    //Obtener unicamente los nombres y los codigos de telefono de los paises
    async getAllCountries(): Promise<any>{
        let result = await this.countrieRepository.find({
            select:["id","nicename","phonecode"]
        });
        if (result.length >= 0){
            return { data: { ok:true,status:200, message: 'Petition successfuly', data: result } }
        }
        return { data: { error: { message: 'Bad request', status: 200, ok: false } } }
    }

    async getById(id:number){
        return await this.countrieRepository.findOne({
            where:{id:id}
        })
    }

}
