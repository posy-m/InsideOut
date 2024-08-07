import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());

  app.useStaticAssets(join(__dirname, '..', 'uploads'))

  app.enableCors({
    origin: "*",
    methods: "GET,POST,DELETE,PUT",
    credentials: true

    // axios 설정하기_cors
    // 왜 설정하냐면, 출처가 다른 곳에서 요청이 왔을때, 백엔드에서 허용을 해줄거냐? 어떤걸 해줄거냐?
    // 아무것도 안적은건 모든 출처 허용
  })

  await app.listen(3000);

}
bootstrap();