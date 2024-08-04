import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
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
    password : "",
    database : "insideoutinfo",
    autoLoadModels : true, // 시퀄라이즈 모델 파일을 자동으로 로드
    synchronize : true, //  실행할때 데이터베이스 스키마를 동기화 
    sync : {force : false} // 테이블을 초기화 할지 말지
  }),SequelizeModule.forFeature([Insideoutinfo]),
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






