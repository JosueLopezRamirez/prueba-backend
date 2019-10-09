import { Injectable } from '@nestjs/common';
import { CommerceModules } from './commerce-modules.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommerceModuleInput } from './commerce-modules.dto';

@Injectable()
export class CommerceModulesService {
    constructor (
        @InjectRepository(CommerceModules)
        private readonly repository: Repository<CommerceModules>
    ) {}

    async getAll():Promise<CommerceModules[]> {
        return await this.repository.find();
    }

    async getById(id: number): Promise<CommerceModules> {
        return await this.repository.findOne({
            where: { id }
        })
    }

    async registerCommerceModules(input: CommerceModuleInput): Promise<CommerceModules> {
        try
        {
            let comercemodules = this.parseCommerceModules(input);
            console.log(comercemodules);
            return this.repository.save(comercemodules);
        }
        catch (error) {
            console.error(error);
        }
        return null;
    }

    private parseCommerceModules (input: CommerceModuleInput):CommerceModules {
        let commercemodules: CommerceModules = new CommerceModules();
        commercemodules.name = input.name;
        return commercemodules;
    }
}
