import { Test, TestingModule } from '@nestjs/testing';
import { RentSystemResolver } from './rent-system.resolver';
import { RentSystemService } from './rent-system.service';

describe('RentSystemResolver', () => {
  let resolver: RentSystemResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentSystemResolver, RentSystemService],
    }).compile();

    resolver = module.get<RentSystemResolver>(RentSystemResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
