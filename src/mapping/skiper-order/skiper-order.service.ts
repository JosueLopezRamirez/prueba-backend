import { Injectable } from '@nestjs/common';
import { SkiperOrder } from './skiper-order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../users/user.service';
import { SkiperCommerceService } from '../skiper-commerce/skiper-commerce.service';
import { SkiperOrderInput } from './skiper-order.dto';

@Injectable()
export class SkiperOrderService {

    constructor(
        @InjectRepository(SkiperOrder) private readonly repository: Repository<SkiperOrder>,
        private readonly userService: UserService,
        private readonly skiperCommerceService: SkiperCommerceService
    ) { }

    async getAll(): Promise<SkiperOrder[]> {
        return await this.repository.find({ relations: ["user", "skiperCommerce"] });
    }

    async getById(id: number): Promise<SkiperOrder> {
        return await this.repository.findOne({
            relations: ["user", "skiperCommerce"],
            where: { id: id }
        });
    }

    async update(input: SkiperOrderInput): Promise<SkiperOrder>{
        //console.log(input);
        try {
            let skiperorderUpdate = await this.getById(input.id);
            skiperorderUpdate.userphone = input.userphone;
            skiperorderUpdate.username = input.username;
            skiperorderUpdate.useraddress = input.useraddress;
            skiperorderUpdate.orderstatus = input.orderstatus;
            skiperorderUpdate.orderdate = input.orderdate;
            skiperorderUpdate.total_price = input.total_price;
            skiperorderUpdate.num_item = input.num_item;
            skiperorderUpdate.user = await this.userService.findById(input.userID);
            skiperorderUpdate.skiperCommerce = await this.skiperCommerceService.getById(input.commerceID);
            
            //console.log(appUpdate);
            return await this.repository.save(skiperorderUpdate);
        } catch (error) {
            console.log(error)
        }
    }

    async registerSkiperOrder(input: SkiperOrderInput): Promise<SkiperOrder> {
        try {
            let user = await this.userService.findById(input.userID);
            let skipercommerce = await this.skiperCommerceService.getById(input.commerceID);
            if (user !== undefined && skipercommerce !== undefined) {
                let skiperorder = this.parseSkiperOder(input, user, skipercommerce);
                console.log(skiperorder);
                return this.repository.save(skiperorder);
            }
        }
        catch (error) {
            console.error(error);
        }
        return null;
    }

    private parseSkiperOder(input: SkiperOrderInput, user?, skipercommerce?): SkiperOrder {
        let skiperorder: SkiperOrder = new SkiperOrder();
        skiperorder.userphone = input.userphone;
        skiperorder.username = input.username;
        skiperorder.useraddress = input.useraddress;
        skiperorder.orderstatus = input.orderstatus;
        skiperorder.orderdate = input.orderdate;
        skiperorder.total_price = input.total_price;
        skiperorder.num_item = input.num_item;
        skiperorder.user = user;
        skiperorder.skiperCommerce = skipercommerce;
        return skiperorder;
    }
}