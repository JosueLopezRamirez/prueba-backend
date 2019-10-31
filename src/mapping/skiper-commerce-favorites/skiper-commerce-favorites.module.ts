import { Module } from '@nestjs/common';
import { SkiperCommerceFavoritesService } from './skiper-commerce-favorites.service';
import { SkiperCommerceFavoritesResolver } from './skiper-commerce-favorites.resolver';

@Module({
  providers: [SkiperCommerceFavoritesService, SkiperCommerceFavoritesResolver]
})
export class SkiperCommerceFavoritesModule {}
