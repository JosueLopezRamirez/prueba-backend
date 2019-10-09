import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TicketStatusInput } from './ticket-status.dto';
import { TicketStatus } from './ticket-status.entity';

@Injectable()
export class TicketStatusService {
    constructor(
        @InjectRepository(TicketStatus) private readonly repository: Repository<TicketStatus>
    ){}

    async getAll(): Promise<TicketStatus[]>{
        try {
            return await this.repository.find();
        } catch (error) {
            console.error(error)
        }
    }

    async getById(id: number): Promise<TicketStatus>{
        return await this.repository.findOne({
            where: {id}
        });
    }

    async registerTicketStatus(input: TicketStatusInput): Promise<TicketStatus>{
        try
        {
            let ticketstatus = this.parseTicketStatus(input);
            console.log(ticketstatus);
            return this.repository.save(ticketstatus);
        } catch (error) {
            console.error(error)
        }
        return null;
    }

    private parseTicketStatus(input: TicketStatusInput): TicketStatus {
        let ticketstatus: TicketStatus = new TicketStatus();
        ticketstatus.name = input.name;
        return ticketstatus;
    }
}
