import { Test, TestingModule } from '@nestjs/testing';
import { SkiperTravelsTracingService } from './skiper-travels-tracing.service';

describe('SkiperTravelsTracingService', () => {
  let service: SkiperTravelsTracingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkiperTravelsTracingService],
    }).compile();

    service = module.get<SkiperTravelsTracingService>(SkiperTravelsTracingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
