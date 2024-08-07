import { Controller, Get, Post, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { TokenGuard } from './login/guard/login.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @UseGuards(TokenGuard)
  @Get()
  getHello() {
    return "hello"
  }
}

// axios
// 어떤 요청 메세지가 바디와 헤더의 내용을 서버 측에서 받았을때 어떻게 파싱되는지