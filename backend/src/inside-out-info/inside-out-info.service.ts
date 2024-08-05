import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//import * as jwt from 'jsonwebtoken'

import * as cookie from 'cookie-parser'
import { CreateUser } from './dto/inside-out.user.dto';
import { retry } from 'rxjs';

@Injectable()
export class InsideOutInfoService {
constructor(private readonly jwt:JwtService){}

        token() {
            try{
                const token = this.jwt.sign({id:1, nick_name:'nick_name'});
                return token
            }catch(error){
console.log(error);
            }
    }

    verify(Testtoken : string){
        console.log(Testtoken)
        const tokenVerify = this.jwt.verify(Testtoken);
        console.log(tokenVerify)
        return tokenVerify
    }

    create(){
        const uid : CreateUser = {
            id: 1,
            uid: 'test',
            upw: 'test',
            nick_name : 'nick_name'
        }
        return uid
    }
}

