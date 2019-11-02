import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SkiperCommerce } from './skiper-commerce.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder } from 'typeorm';
import { SkiperAgentService } from '../skiper-agent/skiper-agent.service';
import { CountrieService } from '../countries/countrie.service';
import { SkiperCatCommerceService } from '../skiper-cat-commerce/skiper-cat-commerce.service';
import { CommerceInput, UserWithoutCommerceDto } from './skiper-commerce.dto';
import { CitiesService } from '../cities/cities.service';
require('isomorphic-fetch');

@Injectable()
export class SkiperCommerceService {

    constructor(
        @InjectRepository(SkiperCommerce) private readonly repository: Repository<SkiperCommerce>,
        private readonly agentService: SkiperAgentService,
        private readonly countryService: CountrieService,
        private readonly skiperCatService: SkiperCatCommerceService,
        private readonly cityService:CitiesService
    ) { }

    async getAll(): Promise<SkiperCommerce[]> {
        try {
            return await this.repository.find({
                relations: [
                    "skiperAgent", "catCommerce", "country",
                    "skiperCatProductsCommerce", "skiperCatProductsCommerce.skiperProductCommerce",
                    "skiperCatProductsCommerce.skiperProductCommerce.optionAddon"
                ]
            });
        } catch (error) {
            console.error(error)
        }
    }

    async GetDistance(origin, destination) {

        const toQueryParams = (object) => {
            return Object.keys(object)
                .filter(key => !!object[key])
                .map(key => key + "=" + encodeURIComponent(object[key]))
                .join("&")
        }

        const ReturnDist = async () => {
            const options = {
                key: "AIzaSyD_S3b75tC_Td7aq8oQLsr5-VX9FO1v2yc",
                mode: "Driving"
            };

            const queryParams = {
                origin: origin,
                destination: destination,
                ...options,
            };

            const url = `https://maps.googleapis.com/maps/api/directions/json?${toQueryParams(queryParams)}` + '&language=es';

            var x = await fetch(url)
                .then(response => response.json())
                .then(json => {
                    if (json.status !== 'OK') {
                        const errorMessage = json.error_message || 'Unknown error';
                        return Promise.reject(errorMessage);
                    }
                    return json;
                });
            return x
        }
        return await ReturnDist()
    };

    async commerceIntoRadio(latitud: number, longitud: number, radio: number, id_category_product: number) {
        try {
            let comercios;
            if (id_category_product == 0) {
                // console.log('no entre aqui');
                comercios = await this.repository.createQueryBuilder("SkiperCommerce")
                    .innerJoinAndSelect("SkiperCommerce.skiperAgent", "SkiperAgent")
                    .innerJoinAndSelect("SkiperCommerce.catCommerce", "SkiperCatCommerce")
                    .innerJoinAndSelect("SkiperCommerce.country", "Countrie")
                    .leftJoinAndSelect("SkiperCommerce.skiperCatProductsCommerce", "SkiperCatProductsCommerce")
                    .leftJoinAndSelect("SkiperCatProductsCommerce.skiperProductCommerce", "SkiperProductCommerce")
                    .leftJoinAndSelect("SkiperProductCommerce.optionAddon", "OptionAddon")
                    .where("SkiperCommerce.lat <> :parametro and SkiperCommerce.lon <> :parametro", { parametro: "" })
                    .getMany();
            } else {
                // console.log('entre aqui');
                comercios = await this.repository.createQueryBuilder("SkiperCommerce")
                    .innerJoinAndSelect("SkiperCommerce.skiperAgent", "SkiperAgent")
                    .innerJoinAndSelect("SkiperCommerce.catCommerce", "SkiperCatCommerce")
                    .innerJoinAndSelect("SkiperCommerce.country", "Countrie")
                    .leftJoinAndSelect("SkiperCommerce.skiperCatProductsCommerce", "SkiperCatProductsCommerce")
                    .leftJoinAndSelect("SkiperCatProductsCommerce.skiperProductCommerce", "SkiperProductCommerce")
                    .leftJoinAndSelect("SkiperProductCommerce.optionAddon", "OptionAddon")
                    .where("SkiperCommerce.lat <> :parametro and SkiperCommerce.lon <> :parametro", { parametro: "" })
                    .andWhere("SkiperCatProductsCommerce.id = :idcatproduct", { idcatproduct: id_category_product })
                    .getMany();
            }
            var Comercios = []

            var c = await Promise.all(comercios.map(async x => {
                var Distancia = await this.GetDistance(latitud.toString() + "," + longitud.toString(),
                    x.lat.toString() + "," + x.lon.toString())
                if (Distancia.routes[0].legs[0].distance.value <= radio)
                    Comercios.push(x)
            }))
            return Comercios

        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async getById(id: number): Promise<SkiperCommerce> {
        return await this.repository.findOne({
            relations: ["skiperAgent", "catCommerce", "country"],
            where: { id: id }
        });
    }

    async registerCommerce(input: CommerceInput): Promise<SkiperCommerce> {
        try {
            let agent = await this.agentService.getById(input.skiperAgentID);
            let country = await this.countryService.getById(input.countryID);
            let catCommerce = await this.skiperCatService.getById(input.catCommerceID);
            let city = await this.cityService.getById(input.cityID);
            if (agent !== undefined && country !== undefined && catCommerce !== undefined && city !== undefined) {
                let commerce = this.parseCommerce(input, agent, country, catCommerce);
                commerce.city = city;
                return this.repository.save(commerce);
            }
        } catch (error) {
            console.error(error)
        }
        return null;
    }

    async getUserWithoutCommerce(){
        let response = [];
        try {
            let result: any[] = await createQueryBuilder("User").select(["User.firstname","User.lastname","SkiperAgent.id"])
            .innerJoin("User.skiperAgent","SkiperAgent")
            .leftJoin("SkiperAgent.skiperCommerce","SkiperCommerce")
            .where("SkiperAgent.categoryAgent = 3")
            .andWhere("SkiperCommerce.id IS NULL")
            .getMany();
            if(result.length > 0){
                result.forEach(item => {
                    response.push(new UserWithoutCommerceDto(item.firstname,item.lastname,item.skiperAgent[0]));
                });
                return response;
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    private parseCommerce(input: CommerceInput, agent?, country?, catCommerce?): SkiperCommerce {
        let commerce: SkiperCommerce = new SkiperCommerce;
        commerce.namecommerce = input.namecommerce;
        commerce.identification_ruc = input.identification_ruc;
        commerce.phone = input.phone;
        commerce.address = input.address;
        commerce.manager = input.manager;
        commerce.lat = input.lat;
        commerce.lon = input.lon;
        commerce.url_art = input.url_art;
        commerce.url_logo = input.url_logo;
        commerce.skiperAgent = agent;
        commerce.country = country;
        commerce.catCommerce = catCommerce;
        return commerce;
    }
}
