import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class signIn {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}