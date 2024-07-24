import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSignUp } from './model/login.model';
import { JwtModule } from '@nestjs/jwt';
import { KakaoStrategy } from './Oauth/kakao.strategy';
import { GoogleStrategy } from './Oauth/google.strategy';


@Module({
  imports: [SequelizeModule.forFeature([UserSignUp]), JwtModule.register({secret : "secret", signOptions: { expiresIn : '30m'}})],
  controllers: [LoginController],
  providers: [LoginService, { provide : "KAKAO_STRATEGY", useClass: KakaoStrategy }, { provide : "GOOGLE_STRATEGY", useClass: GoogleStrategy }],
  exports: [LoginService]
})
export class LoginModule {}
