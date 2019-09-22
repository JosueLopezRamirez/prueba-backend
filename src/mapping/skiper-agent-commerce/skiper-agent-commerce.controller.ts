import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { SkiperAgentCommerceService } from './skiper-agent-commerce.service';
import { UserService } from '../users/user.service';
import { AgentCommerceDto } from './skiper-agent-commerce.dto';
import { SkiperAgentCommerce } from './skiper-agent-commerce.entity';
import { User } from '../users/user.entity';

@Controller('skiper-agent-commerce')
export class SkiperAgentCommerceController {

    constructor(
        private skiperAgentService: SkiperAgentCommerceService,
        private userService: UserService
    ){}

    @Get()
    async getAll() {
        let result = await this.skiperAgentService.getAll();
        if(result!==undefined){
            return {data: {message:'Petition sucsessfuly', ok:true, status:200,data: result}}
        }
        return { data: { error: { message: 'Bad request', status: 200, ok: false } } }
    }

    @Get('/:id')
    async getById(@Param() id: number) {
        let resultAgent = await this.skiperAgentService.getById(id);
        if(resultAgent!==undefined){
            console.log('Usuario de comercio '+resultAgent.user)
            return {data: {message:'Petition sucsessfuly', ok:true, status:200,data: resultAgent}}
        }
        return { data: { error: { message: 'Bad request', status: 200, ok: false } } }
    }

    @Post()
    async create(@Body() agent:AgentCommerceDto){
        let userResult = await this.userService.findById(agent.userId);
        if(userResult===undefined){
            return {data: { error: { ok:false, status: 404, message: 'The user_id in the body dont exist in the database'} } }
        }else{
            let resultAgent = await this.parseEntity(agent,userResult);
            resultAgent = await this.skiperAgentService.create(resultAgent);
            if(resultAgent===undefined){
                return {data: { error: { ok:false, status: 404, message: 'Bad request'} } }
            }else{
                return {data:{error:[],status:200,ok:true,message:'The agent is register successfuly',data: resultAgent}}
            }
        }   
    }

    @Put()
    async update(@Body() agent:AgentCommerceDto){
        let resultActual = await this.skiperAgentService.getById(agent.id);
        if(resultActual===undefined){
            return {data: { error: { ok:false, status: 404, message: 'The skiperAgentCommerce_Id in the body dont exist in the database'} } }
        }else{
            resultActual = this.parseEntity(agent,resultActual.user);
            resultActual.id = agent.id;
            resultActual = await this.skiperAgentService.create(resultActual);
            if(resultActual===undefined){
                return {data: { error: { ok:false, status: 404, message: 'Bad request'} } }
            }else{
                return {data:{error:[],status:200,ok:true,message:'The agent is update successfuly',data: resultActual}}
            }
        }   
    }

    @Delete()
    async delete(@Body() body){
        let resultActual = await this.skiperAgentService.getById(body.id);
        if(resultActual===undefined){
            return {data: { error: { ok:false, status: 404, message: 'The skiperAgentCommerce_Id in the body dont exist in the database'} } }
        }else{
            resultActual.id = body.id;
            let result = await this.skiperAgentService.delete(resultActual);
            if(result.affected > 0){
                return {data: { ok:true,status: 200, message: 'Skiper Agent Commerce is deleted successfuly'}}
            }
        }
    }

    private parseEntity(agent: AgentCommerceDto | SkiperAgentCommerce, user?: User): SkiperAgentCommerce{
        let result: SkiperAgentCommerce = new SkiperAgentCommerce();
        result.identity = agent.identity;
        result.name_owner = agent.name_owner;
        result.state = agent.state;
        result.url_doc_identity = agent.url_doc_identity;
        result.user = user;
        return result;
    }
}