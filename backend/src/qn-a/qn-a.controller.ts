import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { QnAService } from './qn-a.service';
import { CreateQnADTO, DeleteQnADTO, UpdateQnADTO } from 'src/dto/qn-a.dto';
import { Response } from 'express';

@Controller('qn-a')
export class QnAController {
  constructor(private readonly qnaService: QnAService) { }

  // 글 조회
  @Get()
  async qnaPage(
    // page 수, limit 제한, search 검색
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '') {
    // total
    const { results, totalPages } = await this.qnaService.findAndCountAll({
      page, limit, search,
    })

    // 응답 데이터 구조 확인
    res.json({
      results, totalPages,
    });
  }

  // 글 작성
  @Post("/create")
  async create(@Body() CreateQnA: CreateQnADTO, @Res() res: Response) {
    await this.qnaService.create(CreateQnA);
    res.redirect('http://127.0.0.1:5501/frontend/views/QnA.html');
  }

  // 글 상세 조회
  @Get("detail/:id")
  async detail(@Param("id") id: number) {
    const data = await this.qnaService.findOne(id);
    return data;
  }

  // 글 수정
  @Put(":id")
  async update(@Body() updateQnA: UpdateQnADTO, @Param("id") id: number, @Res() res: Response) {
    // console.log(updateQnA);
    const data = await this.qnaService.update(updateQnA, id);
    res.send(data);
  }

  // 글 삭제
  @Delete(":id")
  async destory(@Param("id") deleteQnA: DeleteQnADTO) {
    // console.log(deleteQnA);
    return await this.qnaService.destory(deleteQnA);
  }
}