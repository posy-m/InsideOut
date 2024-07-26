import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Res } from '@nestjs/common';
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
    // console.log(data);
    res.send(data);
  }

  @ApiOperation({ summary: 'Create a QnA' })
  @ApiResponse({ status: 201, description: "QnA Created" })
  @ApiResponse({ status: 400, description: "Invalid input" })
  @ApiBody({
    schema: {
      type: "object",
      properties: { id: { type: "number" }, nick_name: { type: "string" }, qnatitle: { type: "string" }, qnacontent: { type: "string" } }
    }
  })
  @HttpCode(201)
  @Post("/create")
  async create(@Body() CreateQnA: CreateQnADTO, @Res() res: Response) {
    await this.qnaService.create(CreateQnA);
    return res.redirect('http://127.0.0.1:5501/frontend/views/QnA.html');
  }

  @ApiOperation({ summary: 'Get a specific QnA by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'QnA ID' })
  @ApiResponse({ status: 200, description: 'QnA found' })
  @ApiResponse({ status: 404, description: 'QnA not found' })
  @Get("detail/:id")
  async detail(@Param("id") id: number) {
    const data = await this.qnaService.findOne(id);
    return data;
  }

  @ApiOperation({ summary: 'Update a spectific QnA by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the QnA', type: String })
  @ApiResponse({ status: 200, description: 'QnA updated.' })
  @ApiResponse({ status: 404, description: 'QnA not found.' })
  @Put(":id")
  async update(@Body() updateQnA: UpdateQnADTO, @Param("id") id: number, @Res() res: Response) {
    console.log(updateQnA);
    const data = await this.qnaService.update(updateQnA, id);
    res.send(data);
  }

  @ApiOperation({ summary: 'Delete a specific QnA by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the QnA', type: String })
  @ApiResponse({ status: 200, description: 'QnA deleted.' })
  @ApiResponse({ status: 404, description: 'QnA not found.' })
  @Delete(":id")
  async destory(@Param("id") deleteQnA: DeleteQnADTO) {
    console.log(deleteQnA);
    return await this.qnaService.destory(deleteQnA);
  }
}