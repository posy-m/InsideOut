import { Test, TestingModule } from '@nestjs/testing';
import { InsideOutInfoService } from './inside-out-info.service';

describe('InsideOutInfoService', () => {
  let service: InsideOutInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InsideOutInfoService],
    }).compile();

    service = module.get<InsideOutInfoService>(InsideOutInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
