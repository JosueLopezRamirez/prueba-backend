import { Controller, Get, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { CountrieService } from './countrie.service';
import { countrieDto } from './countrie.dto';
import { AuthGuard } from '@nestjs/passport';
import { BaseDecorator } from '../base.decorator';

@Controller('countries')
export class CountrieController {
    
    constructor(private countrieService: CountrieService){}

    // @Get()
    // async getAll() {
    //     return await this.countrieService.getAll();
    // }

    @Get('/list')
    async getAllCountries(){
        return await this.countrieService.getAllCountries();
    }

    // @Post()
    // @UseGuards(AuthGuard('jwt'))
    // async create(@Body() countrie: countrieDto){
    //     return await this.countrieService.create(countrie);
    // }

    // @Put()
    // @UseGuards(AuthGuard('jwt'))
    // async update(@Body() countrie: countrieDto){
    //     const countrieUpdate = await this.countrieService.findById(countrie.id);
    //     if(countrieUpdate){
    //         const result =  this.countrieService.create(countrieUpdate);
    //         return {
    //             data: {
    //                 ok:true,
    //                 status: 200,
    //                 message: 'Countrie register successfuly',
    //                 error:[],
    //                 data: result
    //             }
    //         }
    //     }
    // }

    // @Delete()
    // @UseGuards(AuthGuard('jwt'))
    // async delete(@BaseDecorator() countrie: any){
    //     const id = countrie;
    //     const countrieDelete = await this.countrieService.findById(id);
    //     if (countrieDelete){
    //         return this.countrieService.delete(countrieDelete);
    //     }else{
    //         return {
    //             data: { error: { message: 'The user dont exist', status: 404, ok: false } }
    //         }
    //     }
    // }
}
