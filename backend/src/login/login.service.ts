import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserSignUp } from './model/login.model';
import { UserLoginDto, UserSignUpDto } from './dto/login.dto';
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

    async findId(id: number): Promise<UserSignUp> {
        return await this.userLoginLogic.findOne({ where: { id } });
    }

    async findAll(): Promise<UserSignUp[]> {
        return await this.userLoginLogic.findAll();
    }

    async mkToken(uid: string, upw: string) {
        const payload = { uid, upw }
        return this.jwtService.sign(payload);
    }

    verifyToken(jwt: string) {
        return this.jwtService.verify(jwt);
    }

    generateJWT(user: any) {
        console.log(user);
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
