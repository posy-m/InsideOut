import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from 'src/model/comment.model';
import { Ccomment } from 'src/model/ccomment.model';
import { User } from 'src/model/user.model';
import { QnA } from 'src/model/qn-a.model';

@Module({
  imports: [SequelizeModule.forFeature([User, QnA, Comment, Ccomment])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule { }
