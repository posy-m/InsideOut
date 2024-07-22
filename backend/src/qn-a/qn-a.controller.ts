import { Body, Controller, Get, Param, Post, Render, Res } from '@nestjs/common';
import { QnAService } from './qn-a.service';
import { CreateQnADTO, DeleteQnADTO, UpdateQnADTO } from 'src/dto/qn-a.dto';
import { Response } from 'express';

@Controller('qn-a')
export class QnAController {
  constructor(private readonly qnaService: QnAService) { }
  @Post('create')
  async create(@Body() CreateQnA: CreateQnADTO, @Res() res: Response) {
    const data = await this.qnaService.create(CreateQnA);
    res.redirect(`/QnA/${data.id}`)
  }

  @Get()
  @Render('main')
  mainPage() {
    return
  }

  @Get(":id")
  @Render('detail')
  async detailPage(@Param("id") id: string) {
    const data = await this.qnaService.findAll();
    return { data }
  }

  @Get("/update/:id")
  @Render('update')
  async updatePage(@Param("id") id: string) {
    const data = await this.qnaService.findOne(id);
    return { data };
  }

  @Post("/update/:id")
  async update(@Body() updateQnA: UpdateQnADTO, @Param("id") id: string, @Res() res: Response) {
    const data = await this.qnaService.update(updateQnA);
    res.redirect(`/QnA/${id}`)
    return { data }
  }

  @Get("/delete/:id")
  async destory(@Param("id") deleteQnA: DeleteQnADTO, id: string) {
    const data = await this.qnaService.destroy(deleteQnA);
    return { data }
  }
}
