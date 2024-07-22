import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserSignUp } from './model/login.model';
import { UserLoginDto, UserSignUpDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

@Injectable()
export class LoginService {
    constructor(@InjectModel(UserSignUp)
    private readonly userLoginLogic : typeof UserSignUp,
    private readonly jwt : JwtService) {}

    async create(userLoginLogic : UserSignUpDto) : Promise<UserSignUp>{
        let { uid, upw, nick_name, isAdmin } = userLoginLogic;
        
        const salt = 10;
        const hashedpassword = await bcrypt.hash(upw, salt)
        upw = hashedpassword;
        return this.userLoginLogic.create({
            uid, upw, nick_name, isAdmin
        })
    }

    async findId(id: number) : Promise<UserSignUp>{
        return await this.userLoginLogic.findOne({where: { id }});
    }

    async findAll() : Promise<UserSignUp[]> {
        return await this.userLoginLogic.findAll();
    }

    async mkToken(uid: string, upw: string){
        const payload = {
            uid, upw
        }
        const jwtdata = this.jwt.sign(payload);
        return jwtdata
    }

    verifyToken(jwt : string) {
        return this.jwt.verify(jwt);
    }
}
