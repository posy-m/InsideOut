import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import {join} from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  
  app.useStaticAssets(join(__dirname, '..', 'uploads'))
  
  app.enableCors({
    origin: "*",
    methods: ["GET","POST","DELETE","PUT"],
    credentials: true
  })
  await app.listen(3000);
  
}
bootstrap();
