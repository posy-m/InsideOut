import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserSignUp } from './model/login.model';
import { userDTO, UserLoginDto, UserSignUpDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { AuthStrategy } from './Oauth/auth.strategy';

@Injectable()
export class LoginService {
    constructor(@InjectModel(UserSignUp)
    private readonly userLoginLogic: typeof UserSignUp,
        private readonly jwtService: JwtService,
        @Inject("KAKAO_STRATEGY") private readonly kakaoStrategy: AuthStrategy,
        @Inject("GOOGLE_STRATEGY") private readonly googleStrategy: AuthStrategy,
    ) { }

    async create(userLoginLogic: UserSignUpDto): Promise<UserSignUp> {
        let { uid, upw, nick_name } = userLoginLogic;

        const salt = 10;
        const plainPassword = upw
        const hashedpassword = await bcrypt.hash(plainPassword, salt);
        console.log(hashedpassword)
        return this.userLoginLogic.create({
            uid, upw: hashedpassword, nick_name
        })
    }

    async findId(userInfo: userDTO): Promise<UserSignUp> {
        const { uid, upw, nick_name, isAdmin } = userInfo
        console.log(uid, upw)
        const data = await this.userLoginLogic.findOne({ where: { uid } });
        const dataupw = await bcrypt.compare(upw, data.upw);
        return data
    }

    async findAll(): Promise<UserSignUp[]> {
        return await this.userLoginLogic.findAll();
    }

    async mkToken(login: userDTO) {
        const { uid, upw, nick_name, isAdmin } = login
        const payload = { uid, upw, nick_name, isAdmin }
        return this.jwtService.sign(payload, { secret: 'secret' });
    }

    verifyToken(jwt: string) {
        return this.jwtService.verify(jwt);
    }

    generateJWT(user: any) {
        return {
            access_token: this.jwtService.sign(user)
        }
    }

    async valiDateKakao(code: string): Promise<any> {
        const user = await this.kakaoStrategy.validate(code);
        return this.generateJWT(user);
    }

    async valiDateGoogle(code: string): Promise<any> {
        const user = await this.googleStrategy.validate(code);
        return this.generateJWT(user);
    }
}
