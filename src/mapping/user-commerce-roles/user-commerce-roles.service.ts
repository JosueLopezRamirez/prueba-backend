import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCommerceRoles } from './user-commerce-roles.entity';
import { Repository } from 'typeorm';
import { UserService } from '../users/user.service';
import { SkiperCommerceService } from '../skiper-commerce/skiper-commerce.service';
import { CommerceRolService } from '../commerce-rol/commerce-rol.service';

@Injectable()
export class UserCommerceRolesService {

    constructor(
        @InjectRepository(UserCommerceRoles) private readonly repository:Repository<UserCommerceRoles>,
        private readonly userService:UserService,
        private readonly commerceService:SkiperCommerceService,
        private readonly rolesService:CommerceRolService
    ){}

    async getAll():Promise<UserCommerceRoles[]>{
        return await this.repository.find({relations:["user","skiperCommerce","rol"]});
    }
}
