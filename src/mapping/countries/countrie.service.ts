import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Countrie } from './countrie.entity';
import { Repository } from 'typeorm';
import { countrieDto } from './countrie.dto';

@Injectable()
export class CountrieService {

    constructor(@InjectRepository(Countrie) private countrieRepository: Repository<Countrie>) { }

    //Get a all users
    async getAll(): Promise<Countrie[]> {
        return await this.countrieRepository.find();
    }

    //Obtener unicamente los nombres y los codigos de telefono de los paises
    async getAllCountries(): Promise<any>{
        let result = await this.countrieRepository.find({
            select:["nicename","phonecode"]
        });
        if (result.length >= 0){
            return { data: { ok:true,status:200, message: 'Petition successfuly', data: result } }
        }
        return { data: { error: { message: 'Bad request', status: 200, ok: false } } }
    }

    //Find user by id
    async findById(id: number): Promise<any> {
        let result = await this.countrieRepository.findOne({
            where: {
                id: id
            }
        });
        if(result!==undefined){
            return {data: { message: 'Petition successfuly', ok:true, status:200, data: result } }
        }
        return { data: { error: { message: 'Bad request', status: 200, ok: false } } }
    }

    //Create a new user
    async create(countrie: countrieDto): Promise<Countrie>{
        return this.countrieRepository.save(countrie);
    }

    //Update a user
    async update(countrie: countrieDto): Promise<Countrie> {
        return this.countrieRepository.save(countrie);
    }

    //Delete a user
    async delete(countrie: Countrie) {
        return this.countrieRepository.delete(countrie);
    }
}
