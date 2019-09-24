import { Test, TestingModule } from '@nestjs/testing';
import { SkiperMenuCommerceController } from './skiper-menu-commerce.controller';

describe('SkiperMenuCommerce Controller', () => {
  let controller: SkiperMenuCommerceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkiperMenuCommerceController],
    }).compile();

    controller = module.get<SkiperMenuCommerceController>(SkiperMenuCommerceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
