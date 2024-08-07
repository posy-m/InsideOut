import { Test, TestingModule } from '@nestjs/testing';
import { QnAController } from './qn-a.controller';
import { QnAService } from './qn-a.service';

describe('QnAController', () => {
  let controller: QnAController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QnAController],
      providers: [QnAService],
    }).compile();

    controller = module.get<QnAController>(QnAController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
