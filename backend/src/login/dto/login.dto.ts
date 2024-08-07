import { z } from "zod";

export class UserSignUpDto {
    uid: string;
    upw: string;
    nick_name: string;
}

export class UserLoginDto {
    id: number;
    uid: string;
    upw: string;
}

export class userDTO {
    uid: string;
    upw: string;
    nick_name: string;
    isAdmin: boolean;
}


