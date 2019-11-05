import { Test, TestingModule } from '@nestjs/testing';
import { SkiperWalletsHistoryService } from './skiper-wallets-history.service';

describe('SkiperWalletsHistoryService', () => {
  let service: SkiperWalletsHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkiperWalletsHistoryService],
    }).compile();

    service = module.get<SkiperWalletsHistoryService>(SkiperWalletsHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
