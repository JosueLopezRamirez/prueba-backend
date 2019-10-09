import { Module } from '@nestjs/common';
import { CommerceModules } from './commerce-modules.entity';
import { CommerceModulesService } from './commerce-modules.service';
import { CommerceModulesResolver } from './commerce-modules.resolver';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommerceModules])
  ],
  providers: [
    CommerceModulesService,
    CommerceModulesResolver
  ],
  exports: [
    CommerceModulesService
  ]
})

export class CommerceModulesModule {}
