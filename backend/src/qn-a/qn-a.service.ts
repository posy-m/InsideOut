import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateQnADTO, DeleteQnADTO, UpdateQnADTO } from 'src/dto/qn-a.dto';
import { QnA } from 'src/model/qn-a.model';

@Injectable()
export class QnAService {
    constructor(
        // private readonly httpService: HttpService,
        @InjectModel(QnA) private readonly QnAModel: typeof QnA) { }

    async create(createQnA: CreateQnADTO) {
        const { id, nick_name, qna_title, qna_content } = createQnA
        return await this.QnAModel.create({
            id, nick_name, qna_title, qna_content
        })
    }

    async findAll(): Promise<QnA[]> {
        return await this.QnAModel.findAll();
    }

    async findOne(id: string) {
        return await this.QnAModel.findOne({ where: { id } })
    }

    async update(updateQnA: UpdateQnADTO) {
        const { id, nick_name, qna_title, qna_content } = updateQnA
        return this.QnAModel.update({
            id, nick_name, qna_title, qna_content
        }, { where: { id } })
    }

    async destory(deleteQnA: DeleteQnADTO) {
        const { id } = deleteQnA
        return this.QnAModel.destroy({ where: { id } })
    }
}