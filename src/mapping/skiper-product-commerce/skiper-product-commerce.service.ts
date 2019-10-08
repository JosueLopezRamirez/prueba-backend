import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkiperProductCommerce } from './skiper-product-commerce.entity';
import { Repository } from 'typeorm';
import { SkiperCommerceService } from '../skiper-commerce/skiper-commerce.service';
import { SkiperCatProductCommerceService } from '../skiper-cat-product-commerce/skiper-cat-product-commerce.service';
import { ProductCommerceInput } from './skiper-product-commerce.dto';

@Injectable()
export class SkiperProductCommerceService {
    
    constructor(
        @InjectRepository(SkiperProductCommerce) private readonly repository:Repository<SkiperProductCommerce>,
        private readonly commerceService:SkiperCommerceService,
        private readonly catProductService:SkiperCatProductCommerceService
    ){}

    async getAll():Promise<SkiperProductCommerce[]>{
        return await this.repository.find({relations:["skiperCommerce","skiperProducts"]});
    }

    async getById(id:number):Promise<SkiperProductCommerce>{
        try {
            return await this.repository.findOneOrFail({
                relations:["skiperCommerce","skiperProducts"],
                where:{id}
            });    
        } catch (error) {
            console.error(error);   
        }
    }

    async getAllByPagination(page:number):Promise<SkiperProductCommerce[]> {
        return await this.repository.find({
            relations:["skiperCommerce","skiperProducts"],
            take: 25,
            skip: 25 * (page - 1),
            order: { id: 'ASC' }
        })
    }

    async registerProductCommerce(input: ProductCommerceInput):Promise<SkiperProductCommerce>{
        try {
            let commerce = await this.commerceService.getById(input.skiperCommerceID);
            let categoryProduct = await this.catProductService.getById(input.skiperProductsID);
            if (commerce === undefined && categoryProduct === undefined){
                let product = this.parseProduct(input,commerce,categoryProduct); 
                product = await this.repository.save(input);
                return product;
            }
        } catch (error) {
            console.log(error);
        }
    }

    private parseProduct(input:ProductCommerceInput,commerce?,categoryProduct?):SkiperProductCommerce {
        let result: SkiperProductCommerce = new SkiperProductCommerce();
        result.description = input.description;
        result.discount = input.discount;
        result.isAddon = input.isAddon;
        result.isSize = input.isSize;
        result.name = input.name;
        result.price = input.price;
        result.url_img_product = input.url_img_product;
        result.skiperCommerce = commerce;
        result.skiperProducts = categoryProduct;
        return result;
    }
}
