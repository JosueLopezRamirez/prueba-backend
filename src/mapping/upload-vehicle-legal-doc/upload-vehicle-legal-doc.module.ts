import { Module } from '@nestjs/common';
import { UploadVehicleLegalDocService } from './upload-vehicle-legal-doc.service';
import { UploadVehicleLegalDocResolver } from './upload-vehicle-legal-doc.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadVehicleLegalDoc } from './upload-vehicle-legal-doc.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UploadVehicleLegalDoc])],
  providers: [UploadVehicleLegalDocService, UploadVehicleLegalDocResolver],
  exports:[UploadVehicleLegalDocService]
})
export class UploadVehicleLegalDocModule {}
