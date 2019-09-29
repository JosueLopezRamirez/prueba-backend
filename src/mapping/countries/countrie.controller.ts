import { Controller, Get, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { CountrieService } from './countrie.service';
import { countrieDto } from './countrie.dto';
import { AuthGuard } from '@nestjs/passport';
import { BaseDecorator } from '../base.decorator';

@Controller('countries')
export class CountrieController {
    
    constructor(private countrieService: CountrieService){}

    // @Get('/list')
    // @UseGuards(AuthGuard('jwt'))
    async getAllCountries(){
        return await this.countrieService.getAllCountries();
    }
}
