import { Test, TestingModule } from '@nestjs/testing';
import { CcommentController } from './ccomment.controller';
import { CcommentService } from './ccomment.service';

describe('CcommentController', () => {
  let controller: CcommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CcommentController],
      providers: [CcommentService],
    }).compile();

    controller = module.get<CcommentController>(CcommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
