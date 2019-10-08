import { Injectable } from '@nestjs/common';
import { CommerceRol } from './commerce-rol.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommerceRolService {
    constructor(@InjectRepository(CommerceRol) private readonly repository:Repository<CommerceRol>){}

    async getAll():Promise<CommerceRol[]> {
        return await this.repository.find();
    }

    async getById(id:number):Promise<CommerceRol> {
        return await this.repository.findOneOrFail({id});
    }
}
