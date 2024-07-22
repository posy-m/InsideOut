
export class UserSignUpDto {
    uid: string;
    upw: string;
    nick_name: string;
    isAdmin: boolean;
}

export class UserLoginDto {
    id: number;
    uid: string;
    upw: string;
}