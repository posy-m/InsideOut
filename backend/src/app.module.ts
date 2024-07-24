import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { SequelizeModule } from '@nestjs/sequelize';
import * as cookie from 'cookie-parser'
import { LoggerMiddleware } from './login/middleware/login.middleware';
import { LoginService } from './login/login.service';

import { TokenGuard } from './login/guard/login.guard';
import { LoginController } from './login/login.controller';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    autoLoadModels : true,
    synchronize: true,
    sync : { force : false }
  }),LoginModule, ConfigModule.forRoot({isGlobal:true})],
  controllers: [AppController,],
  providers: [AppService,JwtService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookie()).forRoutes("");
    consumer.apply(LoggerMiddleware).forRoutes("login")
  }
}
