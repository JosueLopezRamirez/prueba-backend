import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkiperTravelsTracing } from './skiper-travels-tracing.entity';
import { SkiperTravelsTracingInput } from './skiper-travels-tracing.dto';
import { Repository, createQueryBuilder } from 'typeorm';
import geotz from 'geo-tz';
import momentTimeZone from 'moment-timezone';
import { SkiperTravelsStatusService } from '../skiper-travels-status/skiper-travels-status.service';
import { SkiperTravelsService } from '../skiper-travels/skiper-travels.service';
import { SkiperTravelsStatus } from '../skiper-travels-status/skiper-travels-status.entity';

@Injectable()
export class SkiperTravelsTracingService {
    constructor(
        @InjectRepository(SkiperTravelsTracing)
        private readonly repository: Repository<SkiperTravelsTracing>,
        private readonly skiperTravelsStatusService: SkiperTravelsStatusService,
        private readonly skiperTravelsService: SkiperTravelsService
    ) { }

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
            where: { id },
        });
    }

    async registerTravelsTracing(input: SkiperTravelsTracingInput): Promise<SkiperTravelsTracing> {
        let verifyCode = await this.verifyStatusByCode(input.idtravelstatus);
        if (verifyCode) {
            let result = await this.verifyTravelTracing(input.idtravel, input.idtravelstatus);
            if (result) {
                throw new HttpException(
                    "El viaje ya existe con el estado indicado",
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        //vamos a validar que el estado exista con el estado previo.
        let estado = await this.skiperTravelsStatusService.getByStatusCode(input.idtravelstatus)
        let travel = await this.skiperTravelsService.GetTravelByID(input.idtravel)

        if (travel == undefined)
            throw new HttpException(
                "El viaje no existe",
                HttpStatus.BAD_REQUEST,
            );

        if (travel.skiperTravelsTracing[0].travelstatus.id != estado.prevstatus)
            throw new HttpException(
                estado.errorstatusprev,
                HttpStatus.BAD_REQUEST,
            );

        var zonahoraria = geotz(input.lat, input.lng)
        var fecha = momentTimeZone().tz(zonahoraria.toString()).format("YYYY-MM-DD HH:mm:ss")
        input.fecha = fecha;
        let skipertravel = this.parseSkiperTravelTracing(input, estado.id);
        let result = await this.repository.save(skipertravel);
        result.travel = await this.skiperTravelsService.getById(result.idtravel);
        result.travelstatus = await this.skiperTravelsStatusService.getById(result.idtravelstatus);
        // console.log(result);
        return result;
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

    private parseSkiperTravelTracing(input: SkiperTravelsTracingInput, idtravelstatus: number): SkiperTravelsTracing {
        let skipertravelstracing: SkiperTravelsTracing = new SkiperTravelsTracing();
        skipertravelstracing.idtravel = input.idtravel;
        skipertravelstracing.idtravelstatus = idtravelstatus;
        skipertravelstracing.lat = input.lat;
        skipertravelstracing.lng = input.lng;
        skipertravelstracing.datetracing = input.fecha;
        return skipertravelstracing;
    }

    private async verifyTravelTracing(idtravel: number, idstatus: string) {
        let result = await createQueryBuilder("SkiperTravelsTracing")
            .innerJoin("SkiperTravelsTracing.travelstatus","TravelStatus")
            .where("TravelStatus.codigo = :status", { status: idstatus })
            .andWhere("SkiperTravelsTracing.idtravel = :idtravel", { idtravel })
            .getOne();
        return result;
    }

    private async verifyStatusByCode(code: string) {
        try {
            let result = await createQueryBuilder("SkiperTravelsStatus")
            .where("SkiperTravelsStatus.codigo = :code", { code })
            .getOne();
        return (result !== undefined) ? result : null;
        } catch (error) {
            console.log(error)
        }
    }
}
