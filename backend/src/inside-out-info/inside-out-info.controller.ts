import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { InsideOutInfoService } from './inside-out-info.service';
import { Response, CookieOptions, Request } from 'express';
import * as cookie from 'cookie-parser'

@Controller('inside-out-info')
export class InsideOutInfoController {
  constructor(private readonly insideOutInfoService: InsideOutInfoService) {}

  @Get('testToken')
    testToken(@Res() res : Response, @Req() req: Request){
    const test = this.insideOutInfoService.token()
    const date = new Date();
    date.setMinutes(date.getMinutes()+60);
    res.cookie('token', test,{httpOnly:true,expires:date})
    return res.redirect('http://localhost:3000/inside-out-info')
  }

  @Get()
    testCookie(@Res() res : Response, @Req() req: Request){
    
    const userLogin = this.insideOutInfoService.create();
    console.log(userLogin)

    const { token } = req.cookies;

    const verifiedToken = this.insideOutInfoService.verify(token)
    if(userLogin.id === verifiedToken.id) {
      console.log(userLogin.id === verifiedToken.id)
      return res.send(verifiedToken)
    }
  }
}

