import { Test, TestingModule } from '@nestjs/testing';
import { SkiperCommerceFavoritesResolver } from './skiper-commerce-favorites.resolver';

describe('SkiperCommerceFavoritesResolver', () => {
  let resolver: SkiperCommerceFavoritesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkiperCommerceFavoritesResolver],
    }).compile();

    resolver = module.get<SkiperCommerceFavoritesResolver>(SkiperCommerceFavoritesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
