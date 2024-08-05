import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhiskytipModule } from './whiskytip/whiskytip.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    SequelizeModule.forRoot({
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
