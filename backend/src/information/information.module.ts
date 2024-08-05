import { Module } from '@nestjs/common';
import { InformationService } from './information.service';
import { InformationController } from './information.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Insideoutinfo } from './models/inside-out-info.model';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from './multer/information.multer';

@Module({
  imports : [
    SequelizeModule.forFeature([Insideoutinfo]),
    MulterModule.registerAsync({
    useClass: UploadService,
  })],
  controllers: [InformationController],
  providers: [InformationService],
})
export class InformationModule {}
