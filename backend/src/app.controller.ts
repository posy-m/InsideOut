<<<<<<< HEAD
import { Controller, Get, Res } from '@nestjs/common';
=======
import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
>>>>>>> love
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
<<<<<<< HEAD
=======

>>>>>>> love
  @Get()
  getHello() {
    return "hello"
  }

}
// axios
// 어떤 요청 메세지가 바디와 헤더의 내용을 서버 측에서 받았을때 어떻게 파싱되는지