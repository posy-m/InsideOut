
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { CcommentModule } from './ccomment/ccomment.module';
import { WhiskytipModule } from './whiskytip/whiskytip.module';
import { InformationModule } from './information/information.module';
import { Insideoutinfo } from 'src/information/models/inside-out-info.model';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { SequelizeModule } from '@nestjs/sequelize';
import * as cookie from 'cookie-parser'
import { LoggerMiddleware } from './login/middleware/login.middleware';
import { LoginService } from './login/login.service';
import { TokenGuard } from './login/guard/login.guard';
import { LoginController } from './login/login.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { UserSignUp } from './login/model/login.model';
import { whiskyTip } from './whiskytip/model/whisky_Tip.model';
import { whiskyTipComment } from './whiskytip/model/whisky_Tip_Comment.model';
import { whiskyTipCcomment } from './whiskytip/model/whisky_Tip_Ccomment.model';
import { InsideOutInfoModule } from './inside-out-info/inside-out-info.module';
import { InsideOutInfoController } from './inside-out-info/inside-out-info.controller';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "alswl;0113#",
    database: "insideout",
    autoLoadModels: true,
    synchronize: true,
    sync: { force: false },
    models: [UserSignUp, whiskyTip, whiskyTipComment, whiskyTipCcomment],
  }), LoginModule, ConfigModule.forRoot({ isGlobal: true }),
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
  }), InsideOutInfoModule],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookie()).forRoutes("");
    consumer.apply(LoggerMiddleware).forRoutes("login")
  }
}
