import { Injectable } from '@nestjs/common';
import { SkiperOrderTracing } from './skiper-order-tracing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkiperOrderService } from '../skiper-order/skiper-order.service';
import { SkiperOrdersStatusService } from '../skiper-orders-status/skiper-orders-status.service';

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
}
