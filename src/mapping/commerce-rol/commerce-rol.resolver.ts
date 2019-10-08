import { Resolver, Query } from '@nestjs/graphql';
import { CommerceRolService } from './commerce-rol.service';

@Resolver('CommerceRol')
export class CommerceRolResolver {

    constructor(private readonly service:CommerceRolService){}

    @Query()
    getAllCommerceRoles(){
        return this.service.getAll();
    }
}
