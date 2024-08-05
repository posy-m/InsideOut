<<<<<<< HEAD
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
<<<<<<< HEAD
import { QnAModule } from './qn-a/qn-a.module';
import { CommentModule } from './comment/comment.module';
import { CcommentModule } from './ccomment/ccomment.module';
import { UserModule } from './user/user.module';
=======
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhiskytipModule } from './whiskytip/whiskytip.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
>>>>>>> love

@Module({
  imports: [
    SequelizeModule.forRoot({
<<<<<<< HEAD
      dialect: "mysql",
      username: "root",
      password: "dlalsgur12",
      host: "127.0.0.1",
      database: "insideout",
      autoLoadModels: true,
      synchronize: true, // 애플리케이션 실행 했을 때 데이터베이스랑 동기화를 할 것인지 ?
      sync: { force: false } // true 시 초기화
    }),
    QnAModule, CommentModule, CcommentModule, UserModule],
=======
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'alswl;0113#',
      database: 'insideout',
      autoLoadModels: true,
      sync: { force: false },
    }),
    WhiskytipModule,
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
    })
  ],
>>>>>>> love
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
<<<<<<< HEAD
=======
import { InsideOutInfoModule } from 'src/inside-out-info/inside-out-info.module';
import { Insideoutinfo } from 'src/information/models/inside-out-info.model';
import { ConfigModule } from '@nestjs/config';
import { InformationModule } from './information/information.module';
import * as cookie from 'cookie-parser';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect : "mysql",
    host : "localhost",
    port : 3306,
    username : "root",
    password : "kjkj28892889",
    database : "insideoutinfo",
    autoLoadModels : true, // 시퀄라이즈 모델 파일을 자동으로 로드
    synchronize : true, //  실행할때 데이터베이스 스키마를 동기화 
    sync : {force : false} // 테이블을 초기화 할지 말지
  }),
  SequelizeModule.forFeature([Insideoutinfo]),
  ConfigModule.forRoot({ isGlobal: true }),
  InsideOutInfoModule,
  InformationModule], // 외부 모듈 주입
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookie()).forRoutes("*");
  }
}






>>>>>>> respect
=======
>>>>>>> love
