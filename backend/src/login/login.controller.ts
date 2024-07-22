import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { Request, Response } from 'express';
import { UserLoginDto, UserSignUpDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { TokenGuard } from './guard/login.guard';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}


  @Post()
  @UseGuards(TokenGuard)
  async logIn(@Req() req:Request, @Res() res:Response){
    try {
      const { uid, upw, nick_name, isAdmin } = req.body
      const data = await this.loginService.findAll();
      const findIdData = data.find((obj) => obj.uid === uid)
      const findPwData = data.find((obj) => obj.upw === upw)
      
      if((findIdData.uid === uid) && (findPwData.upw === upw)){
        const Token = await this.loginService.mkToken(uid, upw);
        const date = new Date();
        const cookieDate = new Date(date.setMinutes(date.getMinutes() + 5));
        res.cookie("accessToken", Token, {httpOnly : true, expires : cookieDate});
      }
    } catch (error) {
      throw new UnauthorizedException('에러')
    }
  }

  @Post('signup')
  async signUp(@Body() signUpUser:UserSignUpDto, @Req() req:Request, @Res() res:Response){
    const { id } = await this.loginService.create(signUpUser);
    return console.log(id);
  }
}
