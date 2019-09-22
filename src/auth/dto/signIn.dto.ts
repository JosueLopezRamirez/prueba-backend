import { IsEmail, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class signInDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class twilioDto {
    
    @IsNotEmpty()
    phone_number: string;
    
    @IsOptional()
    channel: string;

    @IsOptional()
    code: string;
}

export class singUpDto {
    
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