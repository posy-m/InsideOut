import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserSignUpDto } from 'src/login/dto/login.dto';
import { UserSignUp } from 'src/login/model/login.model';
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

@Injectable()
export class UserSignUpRepository {
    constructor(@InjectModel(UserSignUp)
    private readonly userLoginLogic : typeof UserSignUp
    ) {}
  async createUser(userLoginLogic : UserSignUpDto) : Promise<UserSignUp> {
    // 사용자 생성 로직 구현
        let { uid, upw, nick_name } = userLoginLogic;
        
        const salt = 10;
        const hashedpassword = await bcrypt.hash(upw, salt)
        upw = hashedpassword;
        return this.userLoginLogic.create({
            uid, upw, nick_name
        })
  }

  async findUserById(uid: string): Promise<any> {
    // 사용자 조회 로직 구현
    return { uid, upw: 'password', nick_name: 'nickname', isAdmin: false };
  }
}