import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionAddon } from './option-addon.entity';

@Module({
    imports:[TypeOrmModule.forFeature([OptionAddon])]
})
export class OptionAddonModule {}
