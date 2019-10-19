import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppCities } from './app-cities.entity';
import { AppCitiesService } from './app-cities.service';

@Module({
    imports:[TypeOrmModule.forFeature([AppCities])],
    providers:[AppCitiesService],
    exports:[AppCitiesService]
})
export class AppCitiesModule {}
