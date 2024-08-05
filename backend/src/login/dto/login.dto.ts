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

export const userDTO = z.object({
    uid: z.string().min(2).max(30),
    upw: z.string().min(2).max(30)
})

