import { Test, TestingModule } from '@nestjs/testing';
import { SkiperTravelsService } from './skiper-travels.service';

describe('SkiperTravelsService', () => {
  let service: SkiperTravelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkiperTravelsService],
    }).compile();

    service = module.get<SkiperTravelsService>(SkiperTravelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
