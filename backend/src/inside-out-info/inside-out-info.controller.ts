import { Body, Controller, Get, Req, Res } from '@nestjs/common';
import { InsideOutInfoService } from './inside-out-info.service';
import { Response, CookieOptions, request, Request } from 'express';
import * as cookie from 'cookie-parser'
import fastifyCookie, { FastifyCookie } from '@fastify/cookie';

@Controller('insideOutInfo')
export class InsideOutInfoController {
  constructor(private readonly insideOutInfoService: InsideOutInfoService) { }

  @Get('testToken')
  testToken(@Res() res: Response, @Req() req: Request) {
    const test = this.insideOutInfoService.token()
    const date = new Date();
    date.setMinutes(date.getMinutes() + 60);
    res.cookie('token', test, { httpOnly: false, expires: date })
    return res.redirect('http://localhost:3000/inside-out-info')
  }

  @Get()
  testCookie(@Req() req: Request, @Res() res: Response) {
    // const cookies = req.cookies;
    const verifiedToken = this.insideOutInfoService.verify(req.headers.authorization);
    return res.send(verifiedToken)
  }
}

