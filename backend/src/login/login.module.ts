import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSignUp } from './model/login.model';
import { JwtModule } from '@nestjs/jwt';
import { KakaoStrategy } from './Oauth/kakao.strategy';
import { GoogleStrategy } from './Oauth/google.strategy';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [SequelizeModule.forFeature([UserSignUp]), JwtModule.register({ signOptions: { expiresIn: '10h' } }), ConfigModule.forRoot()],
  controllers: [LoginController],
  providers: [LoginService, { provide: "KAKAO_STRATEGY", useClass: KakaoStrategy }, { provide: "GOOGLE_STRATEGY", useClass: GoogleStrategy }],
  exports: [LoginService]
})
export class LoginModule { }
