import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkiperAgentCommerce } from './skiper-agent-commerce.entity';
import { Repository } from 'typeorm';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class SkiperAgentCommerceService {

    constructor(
        @InjectRepository(SkiperAgentCommerce) private readonly repoAgent:Repository<SkiperAgentCommerce>,
    ){}

    async getAll(){
        let result = await this.repoAgent.find();
        if(result!==undefined){
            return {data: {message:'Petition sucsessfuly', ok:true, status:200,data: result}}
        }
        return { data: { error: { message: 'Bad request', status: 200, ok: false } } }
    }

    async getById(_id: number){
        let resultAgent = await this.repoAgent.findOne({id:_id});
        if(resultAgent!==undefined){
            return {data: {message:'Petition sucsessfuly', ok:true, status:200,data: resultAgent}}
        }
        return { data: { error: { message: 'Bad request', status: 200, ok: false } } }
    }
}