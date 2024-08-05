import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNumber } from "class-validator"
import { QnA } from "src/model/qn-a.model"

export class CreateQnADTO {
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

// export class PaginatedQnAResultDto {
//     @IsArray()  // 이 데코레이터는 이 속성이 배열임을 보장합니다.
//     results: QnA[];

//     @IsNumber() // 이 데코레이터는 이 속성이 숫자임을 보장합니다.
//     totalPages: number;

//     @IsNumber()
//     currentPage: number;

//     @IsNumber()
//     totalItems: number;
// }