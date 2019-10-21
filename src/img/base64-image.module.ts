import { Module } from '@nestjs/common';
import { ImageUploadResolver } from './image-upload.resolver';

@Module({
  providers: [ImageUploadResolver]
})
export class Base64ImageModule {}
