import { Module } from '@nestjs/common';
import { UploadSkiperDocController } from './upload-skiper-doc.controller';
import { UploadSkiperDocService } from './upload-skiper-doc.service';
import { UploadSkiperDoc } from './upload-skiper-doc.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([UploadSkiperDoc])],
  controllers: [UploadSkiperDocController],
  providers: [UploadSkiperDocService]
})
export class UploadSkiperDocModule {}
