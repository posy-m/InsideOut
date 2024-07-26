import { Module } from '@nestjs/common';
import { CcommentService } from './ccomment.service';
import { CcommentController } from './ccomment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/model/user.model';
import { Comment } from 'src/model/comment.model';
import { Ccomment } from 'src/model/ccomment.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Comment, Ccomment])],
  controllers: [CcommentController],
  providers: [CcommentService],
})
export class CcommentModule { }
