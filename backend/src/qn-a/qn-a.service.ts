import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateQnADTO, DeleteQnADTO, UpdateQnADTO } from 'src/dto/qn-a.dto';
import { QnA } from 'src/model/qn-a.model';

@Injectable()
export class QnAService {
    constructor(
        @InjectModel(QnA) private readonly QnAModel: typeof QnA) { }

    async create(createQnA: CreateQnADTO) {
        const { nick_name, qna_title, qna_content } = createQnA
        return await this.QnAModel.create({
            nick_name, qna_title, qna_content
        })
    }

    async findAll(): Promise<QnA[]> {
        return await this.QnAModel.findAll();
    }

    async findOne(id: number) {
        return await this.QnAModel.findOne({ where: { id } })
    }

    async update(updateQnA: UpdateQnADTO, id: number) {
        const { qna_title, qna_content } = updateQnA
        return this.QnAModel.update({
            qna_title, qna_content
        }, { where: { id } })
    }

    async destory(deleteQnA: DeleteQnADTO) {
        const id = deleteQnA
        console.log(deleteQnA) // 궁금 (객체인지, 숫자값인지)
        return this.QnAModel.destroy({ where: { id } })
    }
}