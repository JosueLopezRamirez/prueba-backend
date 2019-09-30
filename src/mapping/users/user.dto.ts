import { IsEmail, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';
import { Cities } from '../cities/cities.entity';
import { Countrie } from '../countries/countrie.entity';

export class UserDto {
    
    @IsOptional()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    firstname: string;
    
    @IsNotEmpty()
    lastname: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    user: string;

    @IsNotEmpty()
    password: string;
    
    @IsOptional()
    sponsor_id: number;
    
    @IsNotEmpty()
    addres: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    create_at: Date;

    @IsNotEmpty() country:Countrie;

    @IsNotEmpty() city:Cities;
}