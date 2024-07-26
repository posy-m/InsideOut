import { Module } from '@nestjs/common';
import { QnAService } from './qn-a.service';
import { QnAController } from './qn-a.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { QnA } from 'src/model/qn-a.model';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, SequelizeModule.forFeature([QnA])],
  controllers: [QnAController],
  providers: [QnAService],
})
export class QnAModule { }
