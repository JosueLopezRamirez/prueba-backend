import { Injectable } from '@nestjs/common';
import { SkiperOrder } from './skiper-order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../users/user.service';
import { SkiperCommerceService } from '../skiper-commerce/skiper-commerce.service';
import { SkiperOrderInput } from './skiper-order.dto';
import { SkiperOrderTracing } from '../skiper-order-tracing/skiper-order-tracing.entity';

@Injectable()
export class SkiperOrderService {

    constructor(
        @InjectRepository(SkiperOrder) private readonly repository: Repository<SkiperOrder>,
        private readonly userService: UserService,
        private readonly skiperCommerceService: SkiperCommerceService,
    ) { }

    async getAll(): Promise<SkiperOrder[]> {
        return await this.repository.find({ relations: ["user", "skiperCommerce", "skiperOrderTracing"] });
    }

    async getByCommerceIdByIdStatus(idcommerce: number, idstatus: number): Promise<SkiperOrder[]> {
        return await this.repository.createQueryBuilder("SkiperOrder")
        .innerJoinAndSelect("SkiperOrder.user", "User")
        .innerJoinAndSelect("SkiperOrder.skiperCommerce", "SkiperCommerce","SkiperCommerce.id = :idcommerce", { idcommerce })
        .innerJoinAndSelect("SkiperOrder.skiperOrderTracing", "SkiperOrderTracing","SkiperOrderTracing.orderStatus = :idstatus", { idstatus })
        .innerJoinAndSelect(subQuery => {
            return subQuery
            .select("skiperOrderTracing.idorder", "idorder").addSelect("MAX(skiperOrderTracing.datetracing)", "fecha")
            .from(SkiperOrderTracing, "skiperOrderTracing")
            .groupBy("skiperOrderTracing.idorder")
        }, "d", "SkiperOrderTracing.idorder = d.idorder and SkiperOrderTracing.datetracing = d.fecha")
        .innerJoinAndSelect("SkiperOrderTracing.orderStatus", "SkiperOrdersStatus")
        .getMany();
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
            skiperorderUpdate.useraddress = input.useraddress;
            skiperorderUpdate.orderdate = input.orderdate;
            skiperorderUpdate.totalprice = input.totalprice;
            skiperorderUpdate.numitem = input.numitem;
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
        skiperorder.useraddress = input.useraddress;
        skiperorder.orderdate = input.orderdate;
        skiperorder.totalprice = input.totalprice;
        skiperorder.numitem = input.numitem;
        skiperorder.user = user;
        skiperorder.skiperCommerce = skipercommerce;
        return skiperorder;
    }
}