import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkiperAgentDriver } from './skiper-agent-driver.entity';
import { SkiperAgentDriverController } from './skiper-agent-driver.controller';
import { SkiperAgentDriverService } from './skiper-agent-driver.service';
import { UsersModule } from '../users/users.module';
import { SkiperAgentDriverResolver } from './skiper-agent-driver.resolver';

@Module({
    imports:[
        UsersModule,
        TypeOrmModule.forFeature([SkiperAgentDriver])],
    // controllers: [SkiperAgentDriverController],
    providers: [SkiperAgentDriverService, SkiperAgentDriverResolver],
    exports:[SkiperAgentDriverService]
})
export class SkiperAgentDriverModule {}
