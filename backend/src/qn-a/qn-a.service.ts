import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateQnADTO, DeleteQnADTO, UpdateQnADTO } from 'src/dto/qn-a.dto';
import { QnA } from 'src/model/qn-a.model';
import { Op } from 'sequelize';

@Injectable()
export class QnAService {
    constructor(
        @InjectModel(QnA) private readonly QnAModel: typeof QnA) { }

    // 글 작성 함수
    async create(createQnA: CreateQnADTO) {
        const { nick_name, qna_title, qna_content } = createQnA // 작성자, 제목, 내용
        return await this.QnAModel.create({
            nick_name, qna_title, qna_content
        })
    }

    // 전체 게시글 조회 (page : 페이지 번호, limit : 몇 개 정하기, search : 검색)
    async findAll(page: number, limit: number, search: string) {
        try {
            const offset = (page - 1) * limit; // 페이지 번호와 항목 수를 기준으로 데이터의 시작 위치를 계산
            // 'page - 1'은 현재 페이지에서 이전 페이지 수를 의미하고, 이를 limit (페이지당 항목 수)과 곱하여 시작 인덱스를 결정
            // 예를 들어, 페이지가 3이고 limit이 10이면 offset은 (3 - 1) * 10 = 20으로, 데이터 배열에서 21번째 항목부터 시작함

            const searchLower = search ? search.toLowerCase() : ''; // 검색어를 소문자로 변환합니다.

            // 검색 쿼리를 생성합니다.
            const whereClause = searchLower ? {
                [Op.or]: [
                    {
                        'qna_title': { [Op.like]: `%${searchLower}%` }, // `%문자열%` : 문자열에 해당하는 모든 결과를 보여줍니다.
                    },
                    {
                        'qna_content': { [Op.like]: `%${searchLower}%` } // ex) `%find%` : 검색 결과값 => find, findAll, findOne 등등
                    }
                ]
            } : {};

            // 데이터베이스에서 조건에 맞는 QnA 항목을 조회하고 총 개수를 반환
            const { rows, count } = await this.QnAModel.findAndCountAll({
                where: whereClause, // 필터링 조건을 지정하는 where 절
                limit,              // 한 번에 가져올 데이터의 최대 개수 (페이지당 항목 수)
                offset,             // 조회할 데이터의 시작 위치 (페이지네이션을 위해 계산된 값)
                include: [{ all: true }] // 연관된 모든 모델의 데이터를 포함하여 조회
            });

            return {
                results: rows, // 현재 페이지에 해당하는 데이터 목록 (QnA 항목들)
                total: count, // 필터 조건에 맞는 전체 데이터 개수
                currentPage: page, // 현재 페이지 번호
                totalPages: Math.ceil(count / limit), // 전체 페이지 수 (총 데이터 개수를 페이지당 항목 수로 나누고 올림)
            };
        } catch (error) {
            console.error(error);
        }
    }

    async findAndCountAll({ page = 1, limit = 10, search = '' }) {
        try {
            console.log(limit) // limit 값이 제대로 전달되었는지 확인하기 위한 로그 출력

            const offset = (page - 1) * limit; // 현재 페이지에 맞는 데이터 시작 위치 계산
            const searchLower = search ? search.toLowerCase() : ''; // 검색어를 소문자로 변환하여 검색에 사용
            const whereClause = searchLower ? { // 검색 조건 생성: 제목이나 내용에 검색어가 포함된 항목을 찾기 위한 where 절
                [Op.or]: [ // OR 연산자를 사용하여 qna_title 또는 qna_content에서 검색어를 찾음
                    {
                        'qna_title': { [Op.like]: `%${searchLower}%` } // 제목에서 검색어 포함 여부 확인
                    },
                    {
                        'qna_content': { [Op.like]: `%${searchLower}%` } // 내용에서 검색어 포함 여부 확인
                    }
                ]
            } : {}; // 검색어가 없으면 빈 객체를 반환하여 조건을 적용하지 않음

            // 데이터베이스에서 조건에 맞는 항목들을 검색하고, 총 개수를 계산
            const { rows, count } = await this.QnAModel.findAndCountAll({
                where: { // 검색 조건: 제목 또는 내용에 'searchLower' 문자열이 포함된 레코드를 찾음
                    [Op.or]: [
                        {
                            qna_title: { [Op.like]: `%${searchLower}%` }
                        }, {
                            qna_content: { [Op.like]: `%${searchLower}%` }
                        }
                    ]
                },
                limit: parseInt(`${limit}`), // 요청된 limit 만큼의 데이터만 가져옴
                offset, // 페이지 오프셋 설정 (특정 페이지에서 데이터를 가져와서 보여주려고 할 때, 몇번째 데이터부터 보여줄 것인지)
                include: [{ all: true }] // 관련된 모든 모델을 포함하여 조회
            })
            return {
                results: rows, // 검색된 결과 데이터
                total: count, // 전체 검색된 데이터 수
                currentPage: page, // 현재 페이지 번호
                totalPages: Math.ceil(count / limit), // 전체 페이지 수 계산
            };
        } catch (error) {
            console.error(error); // 에러 발생 시 콘솔에 로그 출력
        }

    }

    // 글 상세 조회
    async findOne(id: number) {
        return await this.QnAModel.findOne({ where: { id } })
    }

    // 글 수정
    async update(updateQnA: UpdateQnADTO, id: number) {
        const { qna_title, qna_content } = updateQnA
        return this.QnAModel.update({
            qna_title, qna_content
        }, { where: { id } })
    }

    // 글 삭제
    async destory(deleteQnA: DeleteQnADTO) {
        const id = deleteQnA
        // console.log(deleteQnA)
        return this.QnAModel.destroy({ where: { id } })
    }
}