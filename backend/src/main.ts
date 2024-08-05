import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
<<<<<<< HEAD
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
<<<<<<< HEAD
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
=======
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // axios 설정하기_cors 
  // 왜 설정하냐면, 출처가 다른 곳에서 요청이 왔을때, 백엔드에서 허용을 해줄거냐? 어떤걸 해줄거냐?
  // 아무것도 안적은건 모든 출처 허용
  app.enableCors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: "http://127.0.0.1:5501"
  });

  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  // aws에서 샀을때 도메인을 올리는 방법인데 또 찾아보기
  // 보통은 삼항연산자나 if문으로 처리 하기도 한다.
  // app.enableCors({
  //   origin: [process.env.production ? ]
  // });

  //swagger
  const config = new DocumentBuilder()
    .setTitle("이건 제목이야")
    .setDescription("이건 설명이야")
    .addTag("카카오")
    .addTag("유저")
    .build();

  // 문서의 형태로 생성
  const document = SwaggerModule.createDocument(app, config);
  // api 요청이 들어오면 document 문서를 보여주겠다.
  SwaggerModule.setup("api", app, document);

>>>>>>> love
  await app.listen(3000);
  
}
bootstrap();