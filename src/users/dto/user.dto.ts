import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';

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
    // @IsDateString()
    create_at: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password,10);
    }
}