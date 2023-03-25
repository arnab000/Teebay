import { Test, TestingModule } from '@nestjs/testing';
import { RentSystemService } from './rent-system.service';

describe('RentSystemService', () => {
  let service: RentSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentSystemService],
    }).compile();

    service = module.get<RentSystemService>(RentSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
