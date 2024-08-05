<<<<<<< HEAD
<<<<<<< HEAD
import { Controller, Get, Res } from '@nestjs/common';
=======
import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
>>>>>>> love
=======
import { Controller, Get, UseGuards } from '@nestjs/common';
>>>>>>> hope
import { AppService } from './app.service';
import { TokenGuard } from './login/guard/login.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
<<<<<<< HEAD
=======

<<<<<<< HEAD
>>>>>>> love
=======
  @UseGuards(TokenGuard)
>>>>>>> hope
  @Get()
  getHello() {
    return "hello"
  }

}
// axios
// 어떤 요청 메세지가 바디와 헤더의 내용을 서버 측에서 받았을때 어떻게 파싱되는지