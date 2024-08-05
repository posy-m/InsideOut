import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentDTO, DeleteCommentDTO, UpdateCommentDTO } from 'src/dto/comment.dto';
import { Comment } from 'src/model/comment.model';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment) private readonly CmtModel: typeof Comment) { }

    async create(createCmt: CreateCommentDTO) {
        const { qna_comment, nick_name, qna_id } = createCmt
        return await this.CmtModel.create({
            qna_comment, nick_name, qna_id
        })
    }

    async findAll(): Promise<Comment[]> {
        return await this.CmtModel.findAll();
    }

    async findIndexAll(index: number): Promise<Comment[]> {
        const data = await this.CmtModel.findAll({ where: { qna_id: index } });
        return data;
    }

    async findOne(id: number) {
        return await this.CmtModel.findOne({ where: { id } })
    }

    async update(updateCmt: UpdateCommentDTO, id: number) {
        const { qna_comment } = updateCmt
        return this.CmtModel.update({
            qna_comment
        }, { where: { id } })
    }

    async destroy(deleteCmt: DeleteCommentDTO) {
        const id = deleteCmt
        // console.log(deleteCmt);
        return this.CmtModel.destroy({ where: { id } })
    }
}