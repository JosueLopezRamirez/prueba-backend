import { Injectable } from '@nestjs/common';
import { CommerceModules } from './commerce-modules.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommerceModulesService {

    constructor(@InjectRepository(CommerceModules) private readonly repository: Repository<CommerceModules>) { }

    async getAll(): Promise<CommerceModules[]> {
        return await this.repository.find();
    }

    async getAllWithPagination(page: number = 1): Promise<CommerceModules[]> {
        return await this.repository.find({
            take: 25,
            skip: 25 * (page - 1),
            order: { id: 'ASC' }
        });
    }

    async getById(id: number): Promise<CommerceModules> {
        return await this.repository.findOneOrFail({ id });
    }
}
