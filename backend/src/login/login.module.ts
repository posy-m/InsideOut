import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSignUp } from './model/login.model';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [SequelizeModule.forFeature([UserSignUp]),
  JwtModule.register({secret : "secret", signOptions: { expiresIn : '30m'}})],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}


//