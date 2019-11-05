import { Test, TestingModule } from '@nestjs/testing';
import { SkiperWalletResolver } from './skiper-wallet.resolver';

describe('SkiperWalletResolver', () => {
  let resolver: SkiperWalletResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkiperWalletResolver],
    }).compile();

    resolver = module.get<SkiperWalletResolver>(SkiperWalletResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
