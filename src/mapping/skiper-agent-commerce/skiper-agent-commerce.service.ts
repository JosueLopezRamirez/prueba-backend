import { Injectable, Logger } from '@nestjs/common';
import { SkiperAgentCommerce } from './skiper-agent-commerce.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentCommerceDto, CommerceInput, CommerceOut, CommerceResponse, CommercesOut } from './skiper-agent-commerce.dto';
import { UserService } from '../users/user.service';
import { ErrorResponse } from '../../global.dto';
import { User } from '../users/user.entity';

@Injectable()
export class SkiperAgentCommerceService {

    private logger = new Logger('SkiperAgentCommerceService')

    constructor(
        @InjectRepository(SkiperAgentCommerce)private readonly repoAgent:Repository<SkiperAgentCommerce>,
        private userService: UserService
    ){}

    async getAll(): Promise<SkiperAgentCommerce[]>{
        return await this.repoAgent.find({ relations: ["user"] });
    }

    async getById(_id: number): Promise<SkiperAgentCommerce>{
        return await this.repoAgent.findOne({
            relations:["user"],
            where:{id:_id}
        });
    }

    async create(agent: AgentCommerceDto): Promise<CommerceResponse>{
        let userResult = await this.userService.findById(agent.userId);
        if(userResult===undefined){
            return new CommerceResponse(null,new ErrorResponse('The User id dont exist in the database',404,false));
        }else{
            let res = await this.parseEntity(agent,userResult);
            res = await this.repoAgent.save(res);
            if(res===undefined){
                return new CommerceResponse(null,new ErrorResponse('The User id dont exist in the database',404,false));
            }else{
                return new CommerceResponse(
                    new CommerceOut(
                        res.id,res.name_owner,res.identity,
                        res.url_doc_identity,res.state,res.user
                    )
                    ,null
                );
            }
        }
    }

    async update(id:number,agent: AgentCommerceDto): Promise<CommerceResponse>{
        let result = await this.getById(id);
        if(result === undefined){
            return new CommerceResponse(null,new ErrorResponse('The commerce dont exist!!',404,false));
        }else{
            agent.id = id;
            result.identity = agent.identity;
            result.name_owner = agent.name_owner;
            result.state = agent.state;
            result.url_doc_identity = agent.url_doc_identity;
            result.user = await this.userService.findById(agent.userId);
            let res = await this.repoAgent.save(result)
            if(res === undefined){
                return new CommerceResponse(null,new ErrorResponse('The User id dont exist in the database',404,false));
            }else{
                return new CommerceResponse(
                    new CommerceOut(
                        res.id,res.name_owner,res.identity,
                        res.url_doc_identity,res.state
                    )
                    ,null
                );
            }
        }
    }

    async delete(agent: SkiperAgentCommerce){
        return await this.repoAgent.delete(agent);
    }

    private parseEntity(agent: CommerceInput | SkiperAgentCommerce, user?: User): SkiperAgentCommerce{
        let result: SkiperAgentCommerce = new SkiperAgentCommerce();
        result.identity = agent.identity;
        result.name_owner = agent.name_owner;
        result.state = agent.state;
        result.url_doc_identity = agent.url_doc_identity;
        result.user = user;
        return result;
    }
}