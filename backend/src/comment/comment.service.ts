import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentDTO, DeleteCommentDTO, UpdateCommentDTO } from 'src/dto/comment.dto';
import { Comment } from 'src/model/comment.model';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment) private readonly CmtModel: typeof Comment) { }

    async create(createCmt: CreateCommentDTO) {
        const { QnA_ID, nick_name, QnA_comment } = createCmt
        return await this.CmtModel.create({
            QnA_ID, nick_name, QnA_comment
        })
    }

    async findAll(): Promise<Comment[]> {
        return await this.CmtModel.findAll();
    }

    async findOne(id: number) {
        return await this.CmtModel.findOne({ where: { id } })
    }

    async update(updateCmt: UpdateCommentDTO, id: number) {
        const { QnA_comment } = updateCmt
        return this.CmtModel.update({
            QnA_comment
        }, { where: { id } })
    }

    async destroy(deleteCmt: DeleteCommentDTO) {
        const id = deleteCmt
        console.log(deleteCmt);
        return this.CmtModel.destroy({ where: { id } })
    }
}