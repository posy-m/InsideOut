import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { TokenGuard } from './login/guard/login.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(TokenGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
