import { Module } from '@nestjs/common';
import { SkiperTravelsService } from './skiper-travels.service';
import { SkiperTravelsResolver } from './skiper-travels.resolver';
import { SkiperTravels } from './skiper-travels.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {SkiperAgentModule} from '../skiper-agent/skiper-agent.module';
import {UsersModule} from '../users/users.module';

@Module({
  imports: [
    SkiperAgentModule,
    UsersModule,
    TypeOrmModule.forFeature([SkiperTravels]),
  ],
  providers: [SkiperTravelsService, SkiperTravelsResolver],
  exports:[SkiperTravelsService]

})
export class SkiperTravelsModule {}
