import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginService } from "../login.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenGuard implements CanActivate {
    constructor(private readonly loginService : LoginService,
        private readonly jwtService : JwtService
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest<any>();

        const { authorization } = request.headers;
        if(!authorization){
            throw new UnauthorizedException('액세스 토큰이 필요한 작업입니다.')
        }


        const isBearer = authorization.startsWith('Bearer');
        if(!isBearer) {
            throw new UnauthorizedException('Bearer 토큰이 아님')
        }

        const accessToken = authorization.split(' ').pop();
        if(!accessToken){
            throw new UnauthorizedException('토큰을 찾을 수 없음')
        }

        try {
            const payload = await this.jwtService.verifyAsync(accessToken);

            const user = await this.loginService.findId(payload.id);
            if(!user){
                throw new UnauthorizedException('사용할 수 없는 토큰')
            }
            request.user = user;
            request.role = payload.role;
        } catch (error) {
            throw new UnauthorizedException('사용할 수 없는 토큰')
        }
        return true;
    }
}

// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate(context: ExecutionContext) {
//     const request = context.switchToHttp().getRequest();
//     const authorization = request.headers.authorization;
//     console.log(authorization);
//     if (authorization) {
//       const [scheme, token] = authorization.split(" ");
//       console.log([scheme, token]);
//       return scheme.toLowerCase() === "bearer" && token === "1234";
//     }
//     throw new BadRequestException();
//   }
// }