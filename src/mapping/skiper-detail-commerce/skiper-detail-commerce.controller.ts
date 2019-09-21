import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SkiperDetailCommcerceService } from './skiper-detail-commerce.service';
import { SkiperAgentCommerceService } from '../skiper-agent-commerce/skiper-agent-commerce.service';
import { SkiperCatServicesService } from '../skiper-cat-services/skiper-cat-services.service';
import { DetailCommerceDto } from './dto';
import { SkiperDetailCommerce } from './skiper-detail-commerce.entity';
import { SkiperAgentCommerce } from '../skiper-agent-commerce/skiper-agent-commerce.entity';
import { SkiperCatService } from '../skiper-cat-services/skiper-cat-service.entity';

@Controller('skiper-detail-commcerce')
export class SkiperDetailCommcerceController {
    
    constructor(
        private readonly skiper_detail_service: SkiperDetailCommcerceService,
        private readonly skiperAgent: SkiperAgentCommerceService,
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
    async create(@Body() agent: DetailCommerceDto){
        let resultAgent = await this.skiperAgent.getById(agent.skiper_agent_commerce_id);
        let resultCat = await this.skiperCat.getById(agent.skiper_cat_service_id)
        if(resultAgent === undefined || resultCat === undefined){
            return {data: { error: { ok:false, status: 404, message: 'The user_id in the body dont exist in the database'} } }
        }else{
            let result = await this.parseEntity(agent,resultAgent,resultCat);
            result = await this.skiper_detail_service.create(result);
            if(result===undefined){
                return {data: { error: { ok:false, status: 404, message: 'Bad request'} } }
            }else{
                return {data:{error:[],status:200,ok:true,message:'The agent is register successfuly',data: result}}
            }
        }   
    }

    @Put()
    async update(@Body() agent:DetailCommerceDto){
        let resultActual = await this.skiper_detail_service.getById(agent.id);
        if(resultActual===undefined){
            return {data: { error: { ok:false, status: 404, message: 'The skiperAgentDriver_Id in the body dont exist in the database'} } }
        }else{
            resultActual = this.parseEntity(agent,resultActual.skiper_agent_commerce,resultActual.skiperCatService);
            resultActual.id = agent.id;
            resultActual = await this.skiper_detail_service.create(resultActual);
            if(resultActual===undefined){
                return {data: { error: { ok:false, status: 404, message: 'Bad request'} } }
            }else{
                return {data:{error:[],status:200,ok:true,message:'The agent is update successfuly',data: resultActual}}
            }
        }   
    }

    @Delete()
    async delete(@Body() body){
        let resultActual = await this.skiper_detail_service.getById(body.id);
        if(resultActual === undefined){
            return {data: { error: { ok:false, status: 404, message: 'The skiperAgentDriver_Id in the body dont exist in the database'} } }
        }else{
            resultActual.id = body.id;
            let result = await this.skiper_detail_service.delete(resultActual);
            if(result.affected > 0){
                return {data: { ok:true,status: 200, message: 'Skiper Agent Driver is deleted successfuly'}}
            }
        }
    }

    parseEntity(agent: DetailCommerceDto | SkiperDetailCommerce, skiperAgent: SkiperAgentCommerce, skiperCat: SkiperCatService): SkiperDetailCommerce{
        let result: SkiperDetailCommerce = new SkiperDetailCommerce();
        result.address = agent.address;
        result.identification_ruc = agent.identification_ruc;
        result.manager = agent.manager;
        result.namecommerce = agent.namecommerce;
        result.phone = agent.phone;
        result.skiperCatService = skiperCat;
        result.skiper_agent_commerce = skiperAgent
        return result;
    }
}