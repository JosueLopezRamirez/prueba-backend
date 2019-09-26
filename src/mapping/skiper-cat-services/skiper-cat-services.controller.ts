import { Controller, Logger, Get, UseGuards, Post, Param, Put, Body, Delete } from '@nestjs/common';
import { SkiperCatService } from './skiper-cat-service.entity';
import { AuthGuard } from '@nestjs/passport';
import { SkiperCatServicesService } from './skiper-cat-services.service';
import { validate } from 'class-validator';
import { SkiperCatDto } from './dto';
import { UserDto } from '../users/user.dto';

@Controller('skiper-cat-services')
export class SkiperCatServicesController {
    
    private logger = new Logger('SkiperCatServicesController');

    constructor(private readonly catService:SkiperCatServicesService){}

    //Get a all users
    @Get('/all')
    @UseGuards(AuthGuard('jwt'))
    async getAll(): Promise<any> {
        let result = await this.catService.getAll();
        if(result===undefined){
            return {data: {error:{ message: 'The services dont exist',ok:false,status:404}}}
        }else{
            return {data:{ ok:true,status:200,message: 'The service is get succesfully',data:result}}
        }
    }

    //Find user by id
    @Get('/:id')
    async findById(@Param() id): Promise<any> {
        let catService = await this.catService.getById(id);
        if(catService===undefined){
            return {data: {error:{ message: 'The service dont exist',ok:false,status:404}}}
        }else{
            return {data:{ ok:true,status:200,message: 'The service is get succesfully',data:catService}}
        }
    }

    //Create a new user
    @Post()
    async create(@Body() service: SkiperCatDto) {
        try {
            let skiperCatService: SkiperCatService = this.parseCatService(service);
            let serviceCreate = this.catService.create(skiperCatService);
            return {data:{ ok:true,status:200,message: 'The service is get succesfully',data:serviceCreate}}    
        } catch (error) {
            return {
                data: { error: { message: 'The service dont exist in the database', status: 200, ok: false, error: error }}
            };
        }
        
    }

    //Update a user
    @Put()
    async update(@Body() input: SkiperCatDto): Promise<any> {
        let skiperCatActual =  await this.catService.getById(input.id);
        if(skiperCatActual){
            let skiperCatService: SkiperCatService = this.parseCatService(input);
            skiperCatService.id = skiperCatActual.id;
            let serviceUpdate = await this.catService.create(skiperCatService);
            return {data:{ ok:true,status:200,message: 'The service is get succesfully',data:serviceUpdate}}
        }else{
            return {
                data: { error: { message: 'The service dont exist in the database', status: 200, ok: false }}
            };
        }
    }

    //Delete a user
    @Delete()
    async delete(@Body() body) {
        let resultActual = await this.catService.getById(body.id);
        if(resultActual===undefined){
            return {data: { error: { ok:false, status: 404, message: 'The Service Id in the body dont exist in the database'} } }
        }else{
            resultActual.id = body.id;
            let result = await this.catService.delete(resultActual);
            if(result.affected > 0){
                return {data: { ok:true,status: 200, message: 'Service is deleted successfuly'}}
            }
        }
    }

    parseCatService(input: SkiperCatDto): SkiperCatService{
        let catService: SkiperCatService = new SkiperCatService();
        catService.name = input.name;
        catService.url_img_service = input.url_img_service;
        return catService;
    }
}