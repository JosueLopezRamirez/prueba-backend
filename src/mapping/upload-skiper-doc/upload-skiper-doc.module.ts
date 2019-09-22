import { Module } from '@nestjs/common';
import { UploadSkiperDocController } from './upload-skiper-doc.controller';
import { UploadSkiperDocService } from './upload-skiper-doc.service';
import { UploadSkiperDoc } from './upload-skiper-doc.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkiperDetailVehicleModule } from '../skiper-detail-vehicle/skiper-detail-vehicle.module';

@Module({
  imports:[
    SkiperDetailVehicleModule,
    TypeOrmModule.forFeature([UploadSkiperDoc])],
  controllers: [UploadSkiperDocController],
  providers: [UploadSkiperDocService]
})
export class UploadSkiperDocModule {}
