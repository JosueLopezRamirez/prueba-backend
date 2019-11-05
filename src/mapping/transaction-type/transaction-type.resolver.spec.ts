import { Test, TestingModule } from '@nestjs/testing';
import { TransactionTypeResolver } from './transaction-type.resolver';

describe('TransactionTypeResolver', () => {
  let resolver: TransactionTypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionTypeResolver],
    }).compile();

    resolver = module.get<TransactionTypeResolver>(TransactionTypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
