import axios from "axios";
import { UnauthorizedException } from "@nestjs/common";
import { AuthStrategy } from "./auth.strategy";
import { config } from "dotenv";

export class GoogleStrategy implements AuthStrategy {
    async validate(code: string): Promise<any> {
        try {
            const { data : { access_token } } = await axios.post('https://oauth2.googleapis.com/token', {}, {
              params : {
                client_id : process.env.GOOGLE_CLIENT_KEY,
                client_secret : process.env.GOOGLE_SECRET_KEY,
                redirect_uri : process.env.GOOGLE_CALLBACK_URL,
                grant_type : "authorization_code", // oauth2 인증방식
                code
              }
            });
      
            const { data : userData} = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
              headers : {
                Authorization : `Bearer ${ access_token }`
              }
            });
      
            console.log(userData)
            return userData;
          } catch (error) {
            throw new UnauthorizedException('구글 로그인 인증 실패')
          }
    }
}