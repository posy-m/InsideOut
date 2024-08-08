import { BadRequestException, Body, Controller, Get, Post, Query, Req, Res, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginService } from './login.service';
import { Request, Response } from 'express';
import { userDTO, UserLoginDto, UserSignUpDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { LoginPipe, SignUpPipe } from './pipe/signup.pipe';
import { LoggingInterceptor } from './interceptor/login.logging.interceptor';
import { ErrorInterceptor } from './interceptor/login.error.interceptor';
import { TransformInterceptor } from './interceptor/login.transform.interceptor';
import { config } from 'dotenv';
import { TokenGuard } from './guard/login.guard';

@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService,
  ) { }



  @Post()
  @UsePipes(new ValidationPipe())
  @UsePipes(new LoginPipe(8, 15))
  async logIn(@Body() login: userDTO, @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.loginService.findId(login);
      const token = await this.loginService.mkToken(data);

      const date = new Date();
      date.setTime(date.getTime() + (5 * 60 * 60 * 1000));

      res.cookie('token', token, { httpOnly: true, expires: date, sameSite: 'none', secure: true, path: '/', domain: 'localhost' });
      // res.cookie('token', token, { expires: date, secure: true, sameSite: 'none', path: "/" });
      res.json({ token })

    } catch (error) {
      throw new UnauthorizedException('로그인 실패');
    }
  }



  @Post('signup')
  @UsePipes(SignUpPipe)
  async signUp(@Body() signUpUser: UserSignUpDto, @Req() req: Request, @Res() res: Response) {
    const { id } = await this.loginService.create(signUpUser)
    const { uid, upw, nick_name } = req.body
    console.log(uid, upw, nick_name)
    return res.redirect('http://127.0.0.1:5501/frontend/login.html')
  }

  @Get('kakao')
  kakaoLogin(@Res() res: Response) {
    const REST_API_KEY = process.env.KAKAO_CLIENT_KEY
    const REDIRECT_URI = process.env.KAKAO_CALLBACK_URL
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    res.redirect(kakaoAuthUrl);
  }

  @Get('kakao/callback')
  async kakaoAuthLogin(@Query('code') code: string, @Res() res: Response) {
    const Token = await this.loginService.valiDateKakao(code);
    const date = new Date();
    const cookieDate = new Date(date.setMinutes(date.getMinutes() + 5));
    res.cookie("accessToken", Token, { httpOnly: true, expires: cookieDate });
    return res.send({ message: "카카오 로그인 완료 토큰 생성~", Token })
  }

  @Get('google')
  googleLogin(@Res() res: Response) {
    const MY_CLIENT_ID = process.env.GOOGLE_CLIENT_KEY;
    const MY_REDIRECT_URI = process.env.GOOGLE_CALLBACK_URL;
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${MY_CLIENT_ID}&scope=email%20profile&redirect_uri=${MY_REDIRECT_URI}`
    res.redirect(googleAuthUrl);
  }

  @Get('google/callback')
  async googleAuthLogin(@Query('code') code: string, @Res() res: Response) {
    const Token = await this.loginService.valiDateGoogle(code);
    const date = new Date();
    const cookieDate = new Date(date.setMinutes(date.getMinutes() + 5));
    res.cookie("accessToken", Token, { httpOnly: true, expires: cookieDate });
    return res.send({ message: "구글 로그인 완료 토큰 생성~", Token })
  }
}
