import { Module } from '@nestjs/common';
import { UploadImgAgentService } from './upload-img-agent.service';
import { UploadImgAgentResolver } from './upload-img-agent.resolver';

@Module({
  providers: [UploadImgAgentService, UploadImgAgentResolver]
})
export class UploadImgAgentModule {}
