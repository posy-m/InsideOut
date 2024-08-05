import { Test, TestingModule } from '@nestjs/testing';
import { WhiskytipController } from './whiskytip.controller';
import { WhiskytipService } from './whiskytip.service';

describe('WhiskytipController', () => {
  let controller: WhiskytipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhiskytipController],
      providers: [WhiskytipService],
    }).compile();

    controller = module.get<WhiskytipController>(WhiskytipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
