import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkiperVehicle } from './skiper-vehicle.entity';
import { Repository } from 'typeorm';
import { SkiperVehicleInput } from './skiper-vehicle.dto';

@Injectable()
export class SkiperVehicleService {
    constructor(@InjectRepository(SkiperVehicle) private readonly repository: Repository<SkiperVehicle>) { }

    async getAll():Promise<SkiperVehicle[]> {
        try {
            return await this.repository.find();
        } catch (error) {
            throw new HttpException(
                error,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async getById(id: number):Promise<SkiperVehicle> {
        return await this.repository.findOneOrFail({ 
            where: {id}
        });
    }

    async registerSkiperVehicle(input:SkiperVehicleInput):Promise<SkiperVehicle>{
        try 
        {
            let skiperorderstatus = this.parseSkipeVehicle(input);
            return this.repository.save(skiperorderstatus);
        } catch (error) {
           throw new HttpException(
                error,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async updateSkiperVehicle(input: SkiperVehicleInput): Promise<SkiperVehicle>{
        try {
            let skipervehicle = await this.getById(input.id);
            skipervehicle.license_plate = input.license_plate;
            skipervehicle.skiperCatTravel.id = input.IdCatTravel;
            skipervehicle.vehicleCatalog.id = input.IdVehiclecatalog;
            skipervehicle.vehicleTrademark.id = input.IdTrademark;
            skipervehicle.vehicleModel.id = input.IdModel;
            skipervehicle.vehicleYear.id = input.IdYear;
            skipervehicle.lat = input.lat == undefined ? "" : input.lat;
            skipervehicle.lon = input.lon == undefined ? "" : input.lon;
            return await this.repository.save(skipervehicle);
        } catch (error) {
            throw new HttpException(
                error,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    private parseSkipeVehicle(input:SkiperVehicleInput):SkiperVehicle {
        let skipervehicle:SkiperVehicle = new SkiperVehicle();
        skipervehicle.license_plate = input.license_plate;
        skipervehicle.skiperCatTravel.id = input.IdCatTravel;
        skipervehicle.vehicleCatalog.id = input.IdVehiclecatalog;
        skipervehicle.vehicleTrademark.id = input.IdTrademark;
        skipervehicle.vehicleModel.id = input.IdModel;
        skipervehicle.vehicleYear.id = input.IdYear;
        skipervehicle.lat = input.lat == undefined ? "" : input.lat;
        skipervehicle.lon = input.lon == undefined ? "" : input.lon;
        return skipervehicle;
    }
}
