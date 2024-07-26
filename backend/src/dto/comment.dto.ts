export class CreateCommentDTO {
    id: number
    QnA_ID: number
    nick_name: string
    QnA_comment: string
}

export class UpdateCommentDTO {
    id: number
    QnA_ID: number
    nick_name: string
    QnA_comment: string
}

export class DeleteCommentDTO {
    id: number
}