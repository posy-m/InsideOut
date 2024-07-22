import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhiskytipModule } from './whiskytip/whiskytip.module';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "alswl;0113#",
    database: "insideout",
    autoLoadModels: true,
    sync: { force: false }
  }), WhiskytipModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
