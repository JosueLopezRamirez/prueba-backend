import { Test, TestingModule } from '@nestjs/testing';
import { SkiperTravelsTracingResolver } from './skiper-travels-tracing.resolver';

describe('SkiperTravelsTracingResolver', () => {
  let resolver: SkiperTravelsTracingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkiperTravelsTracingResolver],
    }).compile();

    resolver = module.get<SkiperTravelsTracingResolver>(SkiperTravelsTracingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
