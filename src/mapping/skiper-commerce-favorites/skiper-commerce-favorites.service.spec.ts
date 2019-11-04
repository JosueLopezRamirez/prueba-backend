import { Test, TestingModule } from '@nestjs/testing';
import { SkiperCommerceFavoritesService } from './skiper-commerce-favorites.service';

describe('SkiperCommerceFavoritesService', () => {
  let service: SkiperCommerceFavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkiperCommerceFavoritesService],
    }).compile();

    service = module.get<SkiperCommerceFavoritesService>(SkiperCommerceFavoritesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
