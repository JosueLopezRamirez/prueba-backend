import { Module } from '@nestjs/common';
import { SkiperCommerceFavoritesService } from './skiper-commerce-favorites.service';
import { SkiperCommerceFavoritesResolver } from './skiper-commerce-favorites.resolver';
<<<<<<< HEAD

@Module({
  providers: [SkiperCommerceFavoritesService, SkiperCommerceFavoritesResolver]
})
export class SkiperCommerceFavoritesModule {}
=======
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkiperCommerceFavorite } from './skiper-commerce-favorites.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkiperCommerceFavorite])],
  providers: [SkiperCommerceFavoritesService, SkiperCommerceFavoritesResolver],
  exports: [SkiperCommerceFavoritesService]
})
export class SkiperCommerceFavoritesModule { }
>>>>>>> 7a79b878b592a7c3ea50f4502a9a1462e62f1431
