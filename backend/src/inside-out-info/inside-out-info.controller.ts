import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { InsideOutInfoService } from './inside-out-info.service';
import { Response, CookieOptions, request, Request } from 'express';
import * as cookie from 'cookie-parser'
import fastifyCookie, { FastifyCookie } from '@fastify/cookie';

@Controller('insideOutInfo')
export class InsideOutInfoController {
  constructor(private readonly insideOutInfoService: InsideOutInfoService) { }

  @Get()
  testCookie(@Req() req: Request, @Res() res: Response) {
    const verifiedToken = this.insideOutInfoService.verify(req.cookies['token']);
    return res.send(verifiedToken)
  }

  @Post('logout')
  deleteCookie(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('token', { path: '/', httpOnly: true, sameSite: 'none', secure: true })
    return res.status(200).json({ message: 'Logged out successfully' });
  }
}

