// b7108885361cba759fcbf247127c6576
import { Injectable, UnauthorizedException } from "@nestjs/common";
import axios from "axios";
import { AuthStrategy } from "./auth.strategy";
import { config } from "dotenv";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-kakao"
import { ConfigService } from "@nestjs/config";

export class KakaoStrategy implements AuthStrategy {
    async validate(code: string): Promise<any> {
        try {
            const {data: { access_token }} = await axios.post("https://kauth.kakao.com/oauth/token", {}, {
                
                params : {
                  grant_type : "authorization_code",
                  client_id : process.env.KAKAO_CLIENT_KEY,
                  redirect_uri : process.env.KAKAO_CALLBACK_URL,
                  code,
                }
              });
              const { data : userData } = await axios.get('https://kapi.kakao.com/v2/user/me', {
                headers: {
                  Authorization : `bearer ${access_token }`
                }
              })
              return userData;
        } catch (error) {
            throw new UnauthorizedException('카카오 인증 실패')
        }
    }
}