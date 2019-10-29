import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {SkiperTravelsTracing} from './skiper-travels-tracing.entity';
import {SkiperTravelsTracingInput} from './skiper-travels-tracing.dto';
import { Repository, createQueryBuilder } from 'typeorm';

@Injectable()
export class SkiperTravelsTracingService {
    constructor(
        @InjectRepository(SkiperTravelsTracing)
        private readonly repository: Repository<SkiperTravelsTracing>
    ) {}

    async getAll(): Promise<SkiperTravelsTracing[]> {
        try {
            return await this.repository.find({
                relations: ['travel', 'travelstatus'],
            });

        } catch (error) {
            throw new HttpException(
                error,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async getById(id: number): Promise<SkiperTravelsTracing> {
        return await this.repository.findOneOrFail({
            where: {id},
        });
    }

    async registerTravelsTracing(input: SkiperTravelsTracingInput): Promise<SkiperTravelsTracing> {

        let result = await this.verifyTravelTracing(input.idtravel, input.idtravelstatus);
        if(result){
            throw new HttpException(
                "El viaje ya existe con el estado indicado",
                HttpStatus.BAD_REQUEST,
            );
        }

        let skipertravel = this.parseSkiperTravelTracing(input);
        return this.repository.save(skipertravel);
    }

    //de momento se comenta este funcionalidad
    // async updateSkiperTravelsTracing(input: SkiperTravelsTracingInput): Promise<SkiperTravelsTracing> {
    //     try{
    //         let skipertraveltracing = await this.getById(input.id);
    //         skipertraveltracing.idtravel = input.idtravel;
    //         skipertraveltracing.idtravelstatus = input.idtravelstatus;
    //         skipertraveltracing.datetracing = input.datetracing;
    //         return this.repository.save(skipertraveltracing);
    //     } catch (error) {
    //         throw new HttpException(
    //             error,
    //             HttpStatus.BAD_REQUEST,
    //         );
    //     }
    // }

    private parseSkiperTravelTracing(input: SkiperTravelsTracingInput): SkiperTravelsTracing {
        let skipertravelstracing: SkiperTravelsTracing = new SkiperTravelsTracing();
        skipertravelstracing.idtravel = input.idtravel;
        skipertravelstracing.idtravelstatus = input.idtravelstatus;
        skipertravelstracing.lat = input.lat;
        skipertravelstracing.lng = input.lng;
        skipertravelstracing.datetracing = input.fecha;
        return skipertravelstracing;
    }

    private async verifyTravelTracing(idtravel: number, idstatus: number) {
        let result = await createQueryBuilder("SkiperTravelsTracing")
            .where("SkiperTravelsTracing.idtravelstatus = :status", { status: idstatus })
            .andWhere("SkiperTravelsTracing.idtravel = :idtravel", { idtravel })
            .getOne();
        return result;
    }
}
