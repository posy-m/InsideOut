import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Render, Req, Res } from '@nestjs/common';
import { QnAService } from './qn-a.service';
import { CreateQnADTO, DeleteQnADTO, UpdateQnADTO } from 'src/dto/qn-a.dto';
import { Response } from 'express';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('QnAs')
@Controller('qn-a')
export class QnAController {
  constructor(private readonly qnaService: QnAService) { }

  @ApiOperation({ summary: 'Get all QnAs' })
  @ApiResponse({ status: 200, description: "List of QnAs" })
  @ApiResponse({ status: 404, description: "Fail" })
  @HttpCode(200)
  @Get()
  async qnaPage(@Res() res: Response) {
    const data = await this.qnaService.findAll();
    console.log(data);
    res.send(data);
  }

  @ApiOperation({ summary: 'Create a QnA' })
  @ApiResponse({ status: 201, description: "QnA Created" })
  @ApiResponse({ status: 400, description: "Invalid input" })
  @ApiBody({
    schema: {
      type: "object",
      properties: { id: { type: "string" }, nick_name: { type: "string" }, qnatitle: { type: "string" }, qnacontent: { type: "string" } }
    }
  })
  @HttpCode(201)
  @Post("/create")
  async create(@Body() CreateQnA: CreateQnADTO, @Res() res: Response) {
    await this.qnaService.create(CreateQnA);
    return res.redirect('http://127.0.0.1:5501/frontend/views/QnA.html');
  }

  @ApiOperation({ summary: 'Get a specific QnA by ID' })
  @ApiParam({ name: 'id', type: String, description: 'QnA ID' })
  @ApiResponse({ status: 200, description: 'QnA found' })
  @ApiResponse({ status: 404, description: 'QnA not found' })
  @Get(":id")
  async detail(@Param("id") id: string) {
    const data = await this.qnaService.findOne(id);
    return { data }
  }

  @Put(":id")
  async update(@Body() updateQnA: UpdateQnADTO, @Param("id") id: string, @Res() res: Response) {
    const data = await this.qnaService.update(updateQnA);
    res.redirect(`/qn-a/${id}`)
    return { data }
  }

  @Delete(":id")
  async destory(@Param("id") deleteQnA: DeleteQnADTO) {
    return await this.qnaService.destory(deleteQnA);
  }
}