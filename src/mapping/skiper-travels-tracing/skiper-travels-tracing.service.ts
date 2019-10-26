import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {SkiperTravelsTracing} from './skiper-travels-tracing.entity';
import {SkiperTravelsTracingInput} from './skiper-travels-tracing.dto';
import { Repository } from 'typeorm';

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

    registerTravelsTracing(input: SkiperTravelsTracingInput): Promise<SkiperTravelsTracing> {
        try {
            let skipertravel = this.parseSkiperTravelTracing(input);
            return this.repository.save(skipertravel);

        } catch(error) {
            throw new HttpException(
                error,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async updateSkiperTravelsTracing(input: SkiperTravelsTracingInput): Promise<SkiperTravelsTracing> {
        try{
            let skipertraveltracing = await this.getById(input.id);
            skipertraveltracing.idtravel = input.idtravel;
            skipertraveltracing.idtravelstatus = input.idtravelstatus;
            skipertraveltracing.datetracing = input.datetracing;
            return this.repository.save(skipertraveltracing);
        } catch (error) {
            throw new HttpException(
                error,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    private parseSkiperTravelTracing(input: SkiperTravelsTracingInput): SkiperTravelsTracing {
        let skipertravelstracing: SkiperTravelsTracing = new SkiperTravelsTracing();
        skipertravelstracing.id = input.id;
        skipertravelstracing.idtravel = input.idtravel;
        skipertravelstracing.idtravelstatus = input.idtravelstatus;
        skipertravelstracing.datetracing = input.datetracing;
        return skipertravelstracing;
    }
}
