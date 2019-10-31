import { InputType, ObjectType } from 'type-graphql';
import { UserDto } from '../users/user.dto';
import { CommerceDto } from '../skiper-commerce/skiper-commerce.dto';

@InputType()
export class SkiperCommerceFavoritesInput {
    id: number;
    iduser: number;
    idcommerce: number;
}

@ObjectType()
export class SkiperCommerceFavoritesDto {
    id: number;
    iduser: UserDto;
    CommerceDto: CommerceDto;
}
