import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCcommentDTO, DeleteCcommentDTO, UpdateCcommentDTO } from 'src/dto/ccomment.dto';
import { Ccomment } from 'src/model/ccomment.model';

@Injectable()
export class CcommentService {
    constructor(
        @InjectModel(Ccomment) private readonly CcmtModel: typeof Ccomment) { }

    // 대댓글 작성
    async create(createCcmt: CreateCcommentDTO) {
        const { qna_com_comment, nick_name, qna_comment_id } = createCcmt
        return await this.CcmtModel.create({
            qna_com_comment, nick_name, qna_comment_id
        })
    }

    // 대댓글 전체 조회
    async findAll(): Promise<Ccomment[]> {
        console.log(typeof Ccomment);
        return await this.CcmtModel.findAll();
    }

    // 해당 댓글에 대한 대댓글 조회
    async findIndexAll(index: number): Promise<Ccomment[]> {
        const data = await this.CcmtModel.findAll({ where: { qna_comment_id: index } });
        return data;
    }

    // 대댓글 상세 조회
    async findOne(id: number) {
        return await this.CcmtModel.findOne({ where: { id } });
    }

    // 대댓글 수정
    async update(updateCcmt: UpdateCcommentDTO, id: number) {
        const { qna_com_comment } = updateCcmt;
        return this.CcmtModel.update({
            qna_com_comment
        }, { where: { id } })
    }

    // 대댓글 삭제
    async destroy(deleteCcmt: DeleteCcommentDTO) {
        const id = deleteCcmt;
        return this.CcmtModel.destroy({ where: { id } })
    }
}
