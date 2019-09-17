import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

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