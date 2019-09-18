import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkiperAgentDriver } from './skiper-agent-driver.entity';

@Module({
    imports:[TypeOrmModule.forFeature([SkiperAgentDriver])]
})
export class SkiperAgentDriverModule {}
