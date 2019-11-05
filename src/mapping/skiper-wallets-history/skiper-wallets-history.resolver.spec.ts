import { Test, TestingModule } from '@nestjs/testing';
import { SkiperWalletsHistoryResolver } from './skiper-wallets-history.resolver';

describe('SkiperWalletsHistoryResolver', () => {
  let resolver: SkiperWalletsHistoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkiperWalletsHistoryResolver],
    }).compile();

    resolver = module.get<SkiperWalletsHistoryResolver>(SkiperWalletsHistoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
