import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkiperAgent } from './skiper-agent.entity';
import { SkiperAgentService } from './skiper-agent.service';
import { SkiperAgentResolver } from './skiper-agent.resolver';
import { UsersModule } from '../users/users.module';
import { CategoryAgentModule } from '../category-agent/category-agent.module';

@Module({
    imports:[
        UsersModule,
        CategoryAgentModule,
        TypeOrmModule.forFeature([SkiperAgent])],
    providers: [SkiperAgentService, SkiperAgentResolver],
    exports:[SkiperAgentService]
})
export class SkiperAgentModule {}
