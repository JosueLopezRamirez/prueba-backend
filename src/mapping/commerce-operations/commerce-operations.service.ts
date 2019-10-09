import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommerceOperations } from './commerce-operations.entity';
import { Repository } from 'typeorm';
import { CommerceModulesService } from '../commerce-modules/commerce-modules.service';
import { CommerceOperationsInput } from './commerce-operations.dto';

@Injectable()
export class CommerceOperationsService {

    constructor(
        @InjectRepository(CommerceOperations) private readonly repository: Repository<CommerceOperations>,
        private readonly commerceModulesService: CommerceModulesService
    ) { }

    async getAll(): Promise<CommerceOperations[]> {
        try {
            return await this.repository.find({ relations: ["commerceModule"] });    
        } catch (error) {
            console.error(error);
        }
    }

    async getAllWithPagination(page: number = 1): Promise<CommerceOperations[]> {
        return await this.repository.find({
            relations: ["commerceModule"],
            take: 25,
            skip: 25 * (page - 1),
            order: { id: 'ASC' }
        });
    }

    async getById(id: number): Promise<CommerceOperations> {
        return await this.repository.findOneOrFail({
            relations: ["commerceModule"],
            where: { id }
        });
    }

    async create(input: CommerceOperationsInput): Promise<CommerceOperations> {
        try {
            let commerceModule = await this.commerceModulesService.getById(input.commerceModuleID);
            if (commerceModule !== undefined || commerceModule !== null) {
                let commerceOperation = this.parseCommerceOperation(input, commerceModule);
                return await this.repository.save(commerceOperation);
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    //Metodo para parsear
    private parseCommerceOperation(input: CommerceOperationsInput, commerceModule): CommerceOperations {
        let commerceOp: CommerceOperations = new CommerceOperations();
        commerceOp.name = input.name;
        commerceOp.commerceModule = commerceModule;
        return null;
    }
}