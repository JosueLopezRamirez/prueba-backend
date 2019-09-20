import { Controller, Get, Param } from '@nestjs/common';
import { SkiperAgentCommerceService } from './skiper-agent-commerce.service';

@Controller('skiper-agent-commerce')
export class SkiperAgentCommerceController {

    constructor(private skiperAgentService: SkiperAgentCommerceService){}

    @Get()
    async getAll() {
        return await this.skiperAgentService.getAll();
    }

    @Get('/:id')
    async getById(@Param() id: number) {
        return await this.skiperAgentService.getById(id);
    }
}
