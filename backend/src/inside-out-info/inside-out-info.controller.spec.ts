import { Test, TestingModule } from '@nestjs/testing';
import { InsideOutInfoController } from './inside-out-info.controller';
import { InsideOutInfoService } from './inside-out-info.service';

describe('InsideOutInfoController', () => {
  let controller: InsideOutInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InsideOutInfoController],
      providers: [InsideOutInfoService],
    }).compile();

    controller = module.get<InsideOutInfoController>(InsideOutInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
