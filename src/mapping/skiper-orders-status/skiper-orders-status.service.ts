import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkiperOrdersStatus } from './skiper-orders-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkiperOrdersStatusService {

    constructor(@InjectRepository(SkiperOrdersStatus) private readonly repository: Repository<SkiperOrdersStatus>) { }

    async getAll() {
        return await this.repository.find();
    }

    async getById(id: number) {
        return await this.repository.findOneOrFail({ id });
    }
}
