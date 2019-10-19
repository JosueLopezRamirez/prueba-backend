import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadCommerceAppearance } from './upload-commerce-appearance.entity';
import { UploadCommerceAppearanceService } from './upload-commerce-appearance.service';

@Module({
    imports:[TypeOrmModule.forFeature([UploadCommerceAppearance])],
    providers: [UploadCommerceAppearanceService]
})
export class UploadCommerceAppearanceModule {}
