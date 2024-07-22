import { Test, TestingModule } from '@nestjs/testing';
import { WhiskytipService } from './whiskytip.service';

describe('WhiskytipService', () => {
  let service: WhiskytipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhiskytipService],
    }).compile();

    service = module.get<WhiskytipService>(WhiskytipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
