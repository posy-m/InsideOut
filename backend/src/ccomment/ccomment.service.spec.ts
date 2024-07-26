import { Test, TestingModule } from '@nestjs/testing';
import { CcommentService } from './ccomment.service';

describe('CcommentService', () => {
  let service: CcommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CcommentService],
    }).compile();

    service = module.get<CcommentService>(CcommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
