import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkiperVehicle } from './skiper-vehicle.entity';
import { Repository } from 'typeorm';
import { SkiperVehicleInput } from './skiper-vehicle.dto';

@Injectable()
export class SkiperVehicleService {
    constructor(@InjectRepository(SkiperVehicle) 
    private readonly repository: Repository<SkiperVehicle>) { }

    async getAll():Promise<SkiperVehicle[]> {
        try {
            return await this.repository.find( {
                relations: ["skiperCatTravel", "vehicleCatalog",
                "vehicleTrademark", "vehicleModel", "vehicleYear"]
            });
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
            let skipervehicle = this.parseSkipeVehicle(input);
            return this.repository.save(skipervehicle);
        } catch (error) {
           throw new HttpException(
                error,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async updateSkiperVehicle(input: SkiperVehicleInput): Promise<SkiperVehicle>{
        try {
            console.log(input)
            let skipervehicle = await this.getById(input.id);
            skipervehicle.license_plate = input.license_plate;
            skipervehicle.id_cat_travel =  input.IdCatTravel;
            skipervehicle.id_vehicle_catalog = input.IdVehiclecatalog;
            skipervehicle.idtrademark = input.IdTrademark;
            skipervehicle.idmodel = input.IdModel;
            skipervehicle.idyear = input.IdYear;
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
        skipervehicle.id_cat_travel =  input.IdCatTravel;
        skipervehicle.id_vehicle_catalog = input.IdVehiclecatalog;
        skipervehicle.idtrademark = input.IdTrademark;
        skipervehicle.idmodel = input.IdModel;
        skipervehicle.idyear = input.IdYear;
        skipervehicle.lat = input.lat == undefined ? "" : input.lat;
        skipervehicle.lon = input.lon == undefined ? "" : input.lon;
        return skipervehicle;
    }
}
