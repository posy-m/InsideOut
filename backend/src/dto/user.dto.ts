import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDTO {
    @ApiProperty({
        description: '유저 아이디',
        type: String
    })
    uid: string

    @ApiProperty({
        description: '유저 비밀번호',
        type: String
    })
    upw: string

    @ApiProperty({
        description: '유저 닉네임',
        type: String
    })
    nick_name: string

    @ApiProperty({
        description: '관리자',
        type: String
    })
    authority: string
}