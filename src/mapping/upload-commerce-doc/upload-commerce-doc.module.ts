import { Module } from '@nestjs/common';
import { UploadCommerceDocController } from './upload-commerce-doc.controller';
import { UploadCommerceDocService } from './upload-commerce-doc.service';
import { UploadCommerceDoc } from './upload-commerce-doc.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([UploadCommerceDoc])],
  controllers: [UploadCommerceDocController],
  providers: [UploadCommerceDocService]
})
export class UploadCommerceDocModule {}
