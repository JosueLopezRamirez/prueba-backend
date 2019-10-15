import { Injectable } from '@nestjs/common';
import { SkiperOrderDetail } from './skiper-order-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SkiperOrderService } from '../skiper-order/skiper-order.service';
import { SkiperProductCommerceService } from '../skiper-product-commerce/skiper-product-commerce.service';

import { SkiperOrderDetailInput } from './skiper-order-detail.dto';

@Injectable()
export class SkiperOrderDetailService {
    constructor (
        @InjectRepository(SkiperOrderDetail)
        private readonly repository: Repository<SkiperOrderDetail>,
        private readonly skiperOrderService: SkiperOrderService,
        private readonly skiperProductCommerceService: SkiperProductCommerceService
    ) {}

    async getAll():Promise<SkiperOrderDetail[]> {
        return await this.repository.find({relations:["skiperOrder","skiperProductCommerce"]});
    }

    async getById(id:number):Promise<SkiperOrderDetail> {
        return await this.repository.findOne({
            relations:["skiperOrder","skiperProductCommerce"],
            where: { id }
        });
    }

    async update(input: SkiperOrderDetailInput): Promise<SkiperOrderDetail>{
        //console.log(input);
        try {
            let skiperorderdetailUpdate = await this.getById(input.orderID);
            skiperorderdetailUpdate.quantity = input.quantity;
            skiperorderdetailUpdate.price = input.price;
            skiperorderdetailUpdate.discount = input.discount;
            skiperorderdetailUpdate.size = input.size;
            skiperorderdetailUpdate.addon = input.addon;
            skiperorderdetailUpdate.extraPrice = input.extraPrice;
            
            skiperorderdetailUpdate.skiperOrder = await this.skiperOrderService.getById(input.orderID);
            skiperorderdetailUpdate.skiperProductCommerce = await this.skiperProductCommerceService.getById(input.itemID);
            //console.log(appUpdate);
            return await this.repository.save(skiperorderdetailUpdate);
        } catch (error) {
            console.log(error)
        }
    }

    async registerSkiperOrderDetail(input: SkiperOrderDetailInput): Promise<SkiperOrderDetail> {
        try
        {
            let skiperorder = await this.skiperOrderService.getById(input.orderID);
            let skiperproductcommerce = await this.skiperProductCommerceService.getById(input.itemID);
            if (skiperorder !== undefined && skiperproductcommerce !== undefined) {
                let skiperorderdetail = this.parseSkiperOrderDetail(input, skiperorder, skiperproductcommerce);
                console.log(skiperorderdetail);
                return this.repository.save(skiperorderdetail);
            }
        }
        catch (error) {
            console.error(error);
        }
        return null;
    }

    private parseSkiperOrderDetail (input: SkiperOrderDetailInput, skiperorder?, skiperproductcommerce?):SkiperOrderDetail {
        let skiperorderdetail: SkiperOrderDetail = new SkiperOrderDetail();
        skiperorderdetail.quantity = input.quantity;
        skiperorderdetail.price = input.price;
        skiperorderdetail.discount = input.discount;
        skiperorderdetail.size = input.size;
        skiperorderdetail.addon = input.addon;
        skiperorderdetail.extraPrice = input.extraPrice;
        skiperorderdetail.skiperOrder = skiperorder;
        skiperorderdetail.skiperProductCommerce = skiperproductcommerce;
        return skiperorderdetail;
    }
}
