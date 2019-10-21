import { Injectable } from '@nestjs/common';
import { SkiperCommerce } from './skiper-commerce.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkiperAgentService } from '../skiper-agent/skiper-agent.service';
import { CountrieService } from '../countries/countrie.service';
import { SkiperCatCommerceService } from '../skiper-cat-commerce/skiper-cat-commerce.service';
import { CommerceInput } from './skiper-commerce.dto';

@Injectable()
export class SkiperCommerceService {

    constructor(
        @InjectRepository(SkiperCommerce) private readonly repository:Repository<SkiperCommerce>,
        private readonly agentService:SkiperAgentService,
        private readonly countryService:CountrieService,
        private readonly skiperCatService:SkiperCatCommerceService
    ){}

    async getAll():Promise<SkiperCommerce[]>{
        try {
            
            return await this.repository.find({
                relations:[
                    "skiperAgent","catCommerce","country",
                    "skiperCatProductsCommerce", "skiperCatProductsCommerce.skiperProductCommerce",
                    "skiperCatProductsCommerce.skiperProductCommerce.optionAddon"
                ]
            });
        } catch (error) {
            console.error(error)
        }
    }

    async getById(id:number):Promise<SkiperCommerce>{
        return await this.repository.findOne({
            relations:["skiperAgent","catCommerce","country"],
            where:{id:id}
        });
    }

    async registerCommerce(input:CommerceInput):Promise<SkiperCommerce>{
        try {
            let agent = await this.agentService.getById(input.skiperAgentID);
            let country = await this.countryService.getById(input.countryID);
            let catCommerce = await this.skiperCatService.getById(input.catCommerceID);
            if(agent !== undefined && country !== undefined && catCommerce !== undefined){
                let commerce = this.parseCommerce(input,agent,country,catCommerce);
                console.log(commerce);
                return this.repository.save(commerce);
            }
        } catch (error) {
            console.error(error)
        }
        return null;
    }

    private parseCommerce(input:CommerceInput,agent?,country?,catCommerce?):SkiperCommerce{
        let commerce:SkiperCommerce = new SkiperCommerce;
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
