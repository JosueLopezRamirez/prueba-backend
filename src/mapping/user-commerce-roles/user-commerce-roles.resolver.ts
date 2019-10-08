import { Resolver, Query } from '@nestjs/graphql';
import { UserCommerceRolesService } from './user-commerce-roles.service';

@Resolver('UserCommerceRoles')
export class UserCommerceRolesResolver {

    constructor(private readonly service: UserCommerceRolesService) { }

    @Query()
    allUserCommerceRoles() {
        return this.service.getAll()
    }
}
