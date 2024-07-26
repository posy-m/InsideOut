import { ApiProperty } from "@nestjs/swagger"

export class CreateQnADTO {
    @ApiProperty({
        description: 'QnA 글번호',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'QnA 작성자',
        type: String
    })
    nick_name: string

    @ApiProperty({
        description: 'QnA 제목',
        type: String
    })
    qna_title: string

    @ApiProperty({
        description: 'QnA 내용',
        type: String
    })
    qna_content: string
}

export class UpdateQnADTO {
    @ApiProperty({
        description: "QnA 글번호",
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'QnA 작성자',
        type: String
    })
    nick_name: string

    @ApiProperty({
        description: 'QnA 제목',
        type: String
    })
    qna_title: string

    @ApiProperty({
        description: 'QnA 내용',
        type: String
    })
    qna_content: string
}

export class DeleteQnADTO {
    @ApiProperty({
        description: "QnA 글번호",
        type: Number
    })
    id: number
}