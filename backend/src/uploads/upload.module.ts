import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: UploadService,
    }),
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule { }
