import { Test, TestingModule } from '@nestjs/testing';
import { SkiperTravelsStatusService } from './skiper-travels-status.service';

describe('SkiperTravelsStatusService', () => {
  let service: SkiperTravelsStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkiperTravelsStatusService],
    }).compile();

    service = module.get<SkiperTravelsStatusService>(SkiperTravelsStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
