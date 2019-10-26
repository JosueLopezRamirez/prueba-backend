import { Test, TestingModule } from '@nestjs/testing';
import { SkiperTravelsStatusResolver } from './skiper-travels-status.resolver';

describe('SkiperTravelsStatusResolver', () => {
  let resolver: SkiperTravelsStatusResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkiperTravelsStatusResolver],
    }).compile();

    resolver = module.get<SkiperTravelsStatusResolver>(SkiperTravelsStatusResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
