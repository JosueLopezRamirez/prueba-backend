<<<<<<< HEAD
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
=======
import { UserDto } from "../users/user.dto";
import { CommerceDto } from "../skiper-commerce/skiper-commerce.dto";
import { ObjectType, InputType } from "type-graphql";

@ObjectType()
export class CommerceFavoritesDto {

    id: number;
    // user:UserDto;
    skiperCommerce: CommerceDto;
}

@ObjectType()
export class OkDto {
    ok: boolean
}

@InputType()
export class CommerceFavoriteInput {
    id: number;
    user_id: number;
    commerce_id: number;
>>>>>>> 7a79b878b592a7c3ea50f4502a9a1462e62f1431
}
