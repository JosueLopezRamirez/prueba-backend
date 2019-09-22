import { Controller, Get, Param, Body, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { SkiperDetailVehicleService } from './skiper-detail-vehicle.service';
import { SkiperAgentDriverService } from '../skiper-agent-driver/skiper-agent-driver.service';
import { SkiperCatServicesService } from '../skiper-cat-services/skiper-cat-services.service';
import { DetailVehicleDto } from './dto';
import { SkiperDetailVehicle } from './skiper-detail-vehicle.entity';
import { SkiperAgentDriver } from '../skiper-agent-driver/skiper-agent-driver.entity';
import { SkiperCatService } from '../skiper-cat-services/skiper-cat-service.entity';
import { BaseDecorator } from '../base.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('skiper-detail-vehicle')
export class SkiperDetailVehicleController {

    constructor(
        private readonly skiper_detail_service: SkiperDetailVehicleService,
        private readonly skiperAgent: SkiperAgentDriverService,
        private readonly skiperCat: SkiperCatServicesService
    ){}

    @Get()
    async getAll() {
        let result = await this.skiper_detail_service.getAll();
        if(result!==undefined){
            return {data: {message:'Petition sucsessfuly', ok:true, status:200,data: result}}
        }
        return { data: { error: { message: 'Bad request', status: 200, ok: false } } }
    }

    @Get('/:id')
    async getById(@Param() id: number) {
        let result = await this.skiper_detail_service.getById(id);
        if(result!==undefined){
            return {data: {message:'Petition sucsessfuly', ok:true, status:200,data: result}}
        }
        return { data: { error: { message: 'Bad request', status: 200, ok: false } } }
    }

    @Post()
    async create(@Body() agent: DetailVehicleDto){
        let resultAgent = await this.skiperAgent.getById(agent.skiperAgentDriver);
        let resultCat = await this.skiperCat.getById(agent.skiperCatService)
        if(resultAgent === undefined || resultCat === undefined){
            return {data: { error: { ok:false, status: 404, message: 'The ids in the body dont exist in the database'} } }
        }else{
            let result = await this.parseEntity(agent,resultAgent,resultCat);
            result = await this.skiper_detail_service.create(result);
            if(result===undefined){
                return {data: { error: { ok:false, status: 404, message: 'Bad request'} } }
            }else{
                return {data:{error:[],status:200,ok:true,message:'The Detail Vehicle is register successfuly',data: result}}
            }
        }   
    }

    @Put()
    @UseGuards(AuthGuard('jwt'))
    async update(@Body() agent: DetailVehicleDto){
        let resultActual = await this.skiper_detail_service.getById(agent.id);
        if(resultActual===undefined){
            return {data: { error: { ok:false, status: 404, message: 'The Skiper Detail Vehicle ID in the body dont exist in the database'} } }
        }else{
            resultActual = this.parseEntity(agent,resultActual.skiperAgentDriver,resultActual.skiperCatService);
            resultActual.id = agent.id;
            resultActual = await this.skiper_detail_service.create(resultActual);
            if(resultActual===undefined){
                return {data: { error: { ok:false, status: 404, message: 'Bad request'} } }
            }else{
                return {data:{error:[],status:200,ok:true,message:'The Detail Vehicle is update successfuly',data: resultActual}}
            }
        }   
    }

    @Delete()
    @UseGuards(AuthGuard('jwt'))
    async delete(@BaseDecorator() id){
        let resultActual = await this.skiper_detail_service.getById(id);
        if(resultActual === undefined){
            return {data: { error: { ok:false, status: 404, message: 'The Skiper Detail Vehicle ID in the body dont exist in the database'} } }
        }else{
            resultActual.id = id;
            let result = await this.skiper_detail_service.delete(resultActual);
            if(result.affected > 0){
                return {data: { ok:true,status: 200, message: 'Skiper Detail Vehicle is deleted successfuly'}}
            }
        }
    }

    private parseEntity(agent: DetailVehicleDto | SkiperDetailVehicle, skiperAgent: SkiperAgentDriver, skiperCat: SkiperCatService): SkiperDetailVehicle{
        let result: SkiperDetailVehicle = new SkiperDetailVehicle();
        result.id_type_vehicle = agent.id_type_vehicle;
        result.model = agent.model;
        result.trademark = agent.trademark;
        result.year = agent.year;
        result.skiperCatService = skiperCat;
        result.skiperAgentDriver = skiperAgent
        return result;
    }
}
