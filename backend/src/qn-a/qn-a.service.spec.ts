import { Test, TestingModule } from '@nestjs/testing';
import { QnAService } from './qn-a.service';

describe('QnAService', () => {
  let service: QnAService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QnAService],
    }).compile();

    service = module.get<QnAService>(QnAService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
