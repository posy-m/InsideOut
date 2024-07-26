import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCcommentDTO, DeleteCcommentDTO, UpdateCcommentDTO } from 'src/dto/ccomment.dto';
import { Ccomment } from 'src/model/ccomment.model';

@Injectable()
export class CcommentService {
    constructor(
        @InjectModel(Ccomment) private readonly CcmtModel: typeof Ccomment) { }

    async create(createCcmt: CreateCcommentDTO) {
        const { QnA_comment_ID, nick_name, QnA_com_comment } = createCcmt
        return await this.CcmtModel.create({
            QnA_comment_ID, nick_name, QnA_com_comment
        })
    }

    async findAll(): Promise<Ccomment[]> {
        return await this.CcmtModel.findAll();
    }

    async findOne(id: number) {
        return await this.CcmtModel.findOne({ where: { id } });
    }

    async update(updateCcmt: UpdateCcommentDTO, id: number) {
        const { QnA_com_comment } = updateCcmt;
        return this.CcmtModel.update({
            QnA_com_comment
        }, { where: { id } })
    }

    async destroy(deleteCcmt: DeleteCcommentDTO) {
        const { id } = deleteCcmt;
        return this.CcmtModel.destroy({ where: { id } })
    }
}
