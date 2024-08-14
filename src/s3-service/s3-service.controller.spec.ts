import { Test, TestingModule } from '@nestjs/testing';
import { S3ServiceController } from './s3-service.controller';
import { S3ServiceService } from './s3-service.service';

describe('S3ServiceController', () => {
  let controller: S3ServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [S3ServiceController],
      providers: [S3ServiceService],
    }).compile();

    controller = module.get<S3ServiceController>(S3ServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
