import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSignUpRepository } from 'src/login/entities/login.repository';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserSignUpRepository]
})
export class UserModule {}
