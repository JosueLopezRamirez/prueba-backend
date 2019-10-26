import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkiperTravels } from './skiper-travels.entity';
import { Repository } from 'typeorm';
import { SkiperTravelsInput } from '../skiper-travels/skiper-travels.dto';

@Injectable()
export class SkiperTravelsService {
    constructor(
        @InjectRepository(SkiperTravels)
        private readonly repository: Repository<SkiperTravels>
    ) {}

    async getAll():Promise<SkiperTravels[]>{
        try {
            return await this.repository.find({
                relations: ['users', 'skiperagent'],
            });

        } catch(error) {
            throw new HttpException(
                error,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async getById(id:number):Promise<SkiperTravels>{
        return await this.repository.findOneOrFail({
            where: {id}
        });
    }

    registerTravels(input: SkiperTravelsInput): Promise<SkiperTravels>{
        try {
            let skipertravel = this.parseSkiperTravel(input);
            return this.repository.save(skipertravel);

        } catch(error) {
            throw new HttpException(
                error,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async updateSkiperTravels(input:SkiperTravelsInput): Promise<SkiperTravels> {
        try{
            let skipertravel = await this.getById(input.id);
            skipertravel.idusers = input.idusers;
            skipertravel.iddriver = input.iddriver;
            skipertravel.lat_initial = input.lat_initial;
            skipertravel.lng_initial = input.lng_initial;
            skipertravel.lat_final_seggested = input.lat_final_seggested;
            skipertravel.lng_final_seggested = input.lng_final_seggested;
            skipertravel.lat_final = input.lat_final;
            skipertravel.lng_final = input.lng_final;
            skipertravel.date_init = input.date_init;
            skipertravel.date_final = input.date_final;
            skipertravel.distance = input.distance;
            skipertravel.total = input.total;
            skipertravel.address_initial = input.address_initial;
            skipertravel.address_final = input.address_final;
            skipertravel.address_suggested = input.address_suggested;
            return this.repository.save(skipertravel);

        } catch(error) {
            throw new HttpException(
                error,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    private parseSkiperTravel(input:SkiperTravelsInput):SkiperTravels {
        let skipertravels:SkiperTravels = new SkiperTravels();
        skipertravels.id = input.id;
        skipertravels.idusers = input.idusers;
        skipertravels.iddriver = input.iddriver;
        skipertravels.lat_initial = input.lat_initial;
        skipertravels.lng_initial = input.lng_initial;
        skipertravels.lat_final_seggested = input.lat_final_seggested;
        skipertravels.lng_final_seggested = input.lng_final_seggested;
        skipertravels.lat_final = input.lat_final;
        skipertravels.lng_final = input.lng_final;
        skipertravels.date_init = input.date_init;
        skipertravels.date_final = input.date_final;
        skipertravels.distance = input.distance;
        skipertravels.total = input.total;
        skipertravels.address_initial = input.address_initial;
        skipertravels.address_final = input.address_final;
        skipertravels.address_suggested = input.address_suggested;

        return skipertravels;
    }
}
