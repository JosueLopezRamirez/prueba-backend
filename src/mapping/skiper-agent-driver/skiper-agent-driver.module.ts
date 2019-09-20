import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkiperAgentDriver } from './skiper-agent-driver.entity';
import { SkiperAgentDriverController } from './skiper-agent-driver.controller';
import { SkiperAgentDriverService } from './skiper-agent-driver.service';

@Module({
    imports:[TypeOrmModule.forFeature([SkiperAgentDriver])],
    controllers: [SkiperAgentDriverController],
    providers: [SkiperAgentDriverService],
})
export class SkiperAgentDriverModule {}
