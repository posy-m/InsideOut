import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateQnADTO, DeleteQnADTO, UpdateQnADTO } from 'src/dto/qn-a.dto';
import { QnA } from 'src/model/qn-a.model';

@Injectable()
export class QnAService {
    constructor(@InjectModel(QnA) private readonly QnAModel: typeof QnA) { }

    create(createQnA: CreateQnADTO) {
        const { id, nick_name, QnA_title, QnA_content } = createQnA
        return this.QnAModel.create({
            id, nick_name, QnA_title, QnA_content
        })
    }

    async findAll() {
        return await this.QnAModel.findAll();
    }

    async findOne(id: string) {
        return await this.QnAModel.findOne({ where: { id } })
    }

    async update(updateQnA: UpdateQnADTO) {
        const { id, nick_name, QnA_title, QnA_content } = updateQnA
        return this.QnAModel.update({
            id, nick_name, QnA_title, QnA_content
        }, { where: { id } })
    }

    async destroy(deleteQnA: DeleteQnADTO) {
        const { id } = deleteQnA
        return this.QnAModel.destroy({ where: { id } })
    }
}