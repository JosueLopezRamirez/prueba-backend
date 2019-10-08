import { InputType, ObjectType } from 'type-graphql';
import { UserDto } from '../users/user.dto';
import { CommerceDto } from '../skiper-commerce/skiper-commerce.dto';


@InputType() 
export class SkiperOrderInput {
    id: number;
    userphone: string;
    username: string;
    useraddress: string;
    orderstatus: string;
    orderdate: Date;
    total_price: number;
    num_item: number;
    userID: number;
    commerceID: number;
}

@ObjectType()
export class SkiperOrderDto {
    id: number;
    userphone: string;
    username: string;
    useraddress: string;
    orderstatus: string;
    orderdate: Date;
    total_price: number;
    num_item: number;
    user: UserDto;
    commerce: CommerceDto;
}