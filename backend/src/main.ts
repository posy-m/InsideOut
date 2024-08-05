import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
<<<<<<< HEAD
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*",
    methods: "GET,POST,DELETE,PUT",
    credentials: true
  })

  const config = new DocumentBuilder()
    .setTitle('QnAs example')
    .setDescription('The QnAs API description')
    .setVersion('1.0')
    .addTag('QnAs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

=======
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
>>>>>>> respect
  await app.listen(3000);
  
}
bootstrap();