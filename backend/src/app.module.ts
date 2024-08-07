import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { QnAModule } from './qn-a/qn-a.module';
import { CommentModule } from './comment/comment.module';
import { CcommentModule } from './ccomment/ccomment.module';
import { UserModule } from './user/user.module';
import { WhiskytipModule } from './whiskytip/whiskytip.module';
import { InformationModule } from './information/information.module';
import { InsideOutInfoModule } from 'src/inside-out-info/inside-out-info.module';
import { Insideoutinfo } from 'src/information/models/inside-out-info.model';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './login/login.module';
import { LoggerMiddleware } from './login/middleware/login.middleware';
import { LoginService } from './login/login.service';
import { TokenGuard } from './login/guard/login.guard';
import { LoginController } from './login/login.controller';
import { JwtService } from '@nestjs/jwt';
import * as cookie from 'cookie-parser';
import * as path from 'path';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      username: "root",
      password: "dlalsgur12",
      host: "127.0.0.1",
      database: "insideout",
      autoLoadModels: true,
      synchronize: true, // 애플리케이션 실행 했을 때 데이터베이스랑 동기화를 할 것인지 ?
      sync: { force: false } // true 시 초기화
    }),
    QnAModule, CommentModule, CcommentModule, WhiskytipModule,
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      //rootPath: '/Users/mac/Desktop/uploadFolder',
      rootPath: path.join(__dirname, "uploads"),
      // serveRoot: '/img',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '..', 'frontend', 'html')
    }),
    SequelizeModule.forFeature([Insideoutinfo]),
    ConfigModule.forRoot({ isGlobal: true }),
    InsideOutInfoModule,
    InformationModule,  // 외부 모듈 주입
    LoginModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookie()).forRoutes("");
    consumer.apply(LoggerMiddleware).forRoutes("login")
  }
}