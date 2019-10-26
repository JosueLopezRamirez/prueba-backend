import { Module } from '@nestjs/common';
import { SkiperTravelsService } from './skiper-travels.service';
import { SkiperTravelsResolver } from './skiper-travels.resolver';
import { SkiperTravels } from './skiper-travels.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {SkiperCatTravelsModule} from '../skiper-cat-travels/skiper-cat-travels.module';
import {SkiperAgentModule} from '../skiper-agent/skiper-agent.module';
import {UsersModule} from '../users/users.module';

@Module({
  imports: [
    SkiperAgentModule,
    UsersModule,
    SkiperCatTravelsModule,
    TypeOrmModule.forFeature([SkiperTravels])
  ],
  providers: [SkiperTravelsService, SkiperTravelsResolver],
  exports:[SkiperTravelsService]

})
export class SkiperTravelsModule {}
