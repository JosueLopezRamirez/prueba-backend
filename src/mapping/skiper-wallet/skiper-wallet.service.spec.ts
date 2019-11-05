import { Test, TestingModule } from '@nestjs/testing';
import { SkiperWalletService } from './skiper-wallet.service';

describe('SkiperWalletService', () => {
  let service: SkiperWalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkiperWalletService],
    }).compile();

    service = module.get<SkiperWalletService>(SkiperWalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
