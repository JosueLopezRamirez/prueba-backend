import { IsEmail, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';

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
    country: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    create_at: string;
}