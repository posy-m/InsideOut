import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { SequelizeModule } from '@nestjs/sequelize';
import * as cookie from 'cookie-parser'
import { LoggerMiddleware } from './login/middleware/login.middleware';

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
  }),LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookie()).forRoutes("");
    consumer.apply(LoggerMiddleware).forRoutes("login")
  }
}
