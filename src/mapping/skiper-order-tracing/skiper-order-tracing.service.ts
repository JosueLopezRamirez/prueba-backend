import { Injectable } from '@nestjs/common';
import { SkiperOrderTracing } from './skiper-order-tracing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkiperOrderService } from '../skiper-order/skiper-order.service';
import { SkiperOrdersStatusService } from '../skiper-orders-status/skiper-orders-status.service';
import { SkiperOrderTracingInput } from './skiper-order-tracing.dto';

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

    async create(input: SkiperOrderTracingInput){
        let orderTracing: SkiperOrderTracing = new SkiperOrderTracing();
        try {
            orderTracing.order = await this.orderService.getById(input.orderID);
            orderTracing.orderStatus = await this.orderStatusService.getById(input.orderStatusID);
            if (orderTracing.order !== null && orderTracing.orderStatus !== null){
                orderTracing = await this.repository.save(orderTracing);
                console.log(orderTracing);
                return orderTracing;
            }
        } catch (error) {
            console.log(error)
        }
    }
}
