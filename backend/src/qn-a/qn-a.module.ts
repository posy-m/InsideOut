import { Module } from '@nestjs/common';
import { QnAService } from './qn-a.service';
import { QnAController } from './qn-a.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/model/user.model';
import { QnA } from 'src/model/qn-a.model';
import { Comment } from 'src/model/comment.model';
import { Ccomment } from 'src/model/ccomment.model';

@Module({
  imports: [SequelizeModule.forFeature([User, QnA, Comment, Ccomment])],
  controllers: [QnAController],
  providers: [QnAService],
})
export class QnAModule { }
