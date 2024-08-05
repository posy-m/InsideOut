export class CreateCommentDTO {
    id: number
    qna_comment: string
    nick_name: string
    qna_id: number
}

export class UpdateCommentDTO {
    id: number
    qna_comment: string
    nick_name: string
    qna_id: number
}

export class DeleteCommentDTO {
    id: number
}