import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/model/user.model';
import { QnA } from 'src/model/qn-a.model';
import { Comment } from 'src/model/comment.model';
import { Ccomment } from 'src/model/ccomment.model';
import { UserSignUpRepository } from 'src/login/entities/login.repository';

@Module({
  imports: [SequelizeModule.forFeature([User, QnA, Comment, Ccomment])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserSignUpRepository]
})
export class UserModule { }
