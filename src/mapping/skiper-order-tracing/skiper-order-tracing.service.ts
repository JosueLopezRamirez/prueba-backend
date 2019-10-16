import { Injectable } from '@nestjs/common';
import { SkiperOrderTracing } from './skiper-order-tracing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder } from 'typeorm';
import { SkiperOrderService } from '../skiper-order/skiper-order.service';
import { SkiperOrdersStatusService } from '../skiper-orders-status/skiper-orders-status.service';
import { SkiperOrderTracingInput, OrderTracingResponse } from './skiper-order-tracing.dto';
import { ErrorResponse } from '../../auth/auth.dto';

@Injectable()
export class SkiperOrderTracingService {

    constructor(
        @InjectRepository(SkiperOrderTracing) private readonly repository: Repository<SkiperOrderTracing>,
        private readonly orderService: SkiperOrderService,
        private readonly orderStatusService: SkiperOrdersStatusService
    ) { }

    async getAll() {
        return await this.repository.find({ relations: ["orderStatus", "order"] });
    }

    // async getByOrderStatusAndByCommerceId(idstatus: number,idcommerce:number){
    //     let result =
    // }

    async create(input: SkiperOrderTracingInput) {
        let result = await this.verifyOrderTracing(input.orderID, input.orderStatusID);
        
        if(result){
            return new OrderTracingResponse(null,new ErrorResponse('El estado ya existe para esa orden',200,false))
        }
        
        let orderTracing: SkiperOrderTracing = new SkiperOrderTracing();
        try {
            orderTracing.order = await this.orderService.getById(input.orderID);
            orderTracing.orderStatus = await this.orderStatusService.getById(input.orderStatusID);
            if (orderTracing.order !== null && orderTracing.orderStatus !== null) {
                orderTracing = await this.repository.save(orderTracing);
                return new OrderTracingResponse(orderTracing,null);
            }
        } catch (error) {
            console.log(error)
        }
    }

    private async verifyOrderTracing(idorder: number, idstatus: number) {
        let result = await createQueryBuilder("SkiperOrderTracing")
            .where("SkiperOrderTracing.idorderstatus = :status", { status: idstatus })
            .andWhere("SkiperOrderTracing.idorder = :order", { order: idorder })
            .getOne();
        return result;
    }
}
