import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Res } from '@nestjs/common';
import { QnAService } from './qn-a.service';
import { CreateQnADTO, DeleteQnADTO, UpdateQnADTO } from 'src/dto/qn-a.dto';
import { Response } from 'express';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { json } from 'sequelize';

@ApiTags('QnAs')
@Controller('qn-a')
export class QnAController {
  constructor(private readonly qnaService: QnAService) { }

  @ApiOperation({ summary: 'Get all QnAs' })
  @ApiResponse({ status: 200, description: "List of QnAs" })
  @ApiResponse({ status: 404, description: "Fail" })
  @HttpCode(200)
  @Get()
  async qnaPage(
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = ''
  ) {
    try {
      const { results, total, totalPages } = await this.qnaService.findAndCountAll({
        page,
        limit,
        search,

      })
      //const { results, total, totalPages } = await this.qnaService.findAndCountAll({
      //   page,
      //   limit,
      //   search,
      // });

      //응답 데이터 구조 확인
      res.json({
        results,
        totalPages,
      });

    } catch (error) {
      console.error('Error axiosing QnA list', error);
      res.status(500), json({ error: 'Internal Server Error' });
    }
  }


  // @Get()
  // async qnaPage(
  //   @Res() res: Response,
  //   @Query('page') page: string,
  //   @Query('limit') limit: string,
  //   @Query('search') search: string) {
  //   try {
  //     const pageNumber = parseInt(page) || 1;
  //     const limitNumber = parseInt(limit) || 10;

  //     const data = await this.qnaService.findAll(pageNumber, limitNumber, search);
  //     res.json(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // @Get()
  // async qnaPage(@Res() res: Response, @Query('page') page: string, @Query('limit') limit: string) {
  //   const pageNumber = parseInt(page) || 1;
  //   const limitNumber = parseInt(limit) || 10;

  //   // 서비스에서 데이터와 페이지네이션 정보를 받아옴
  //   const data: PaginatedQnAResultDto = await this.qnaService.findAll(pageNumber, limitNumber);

  //   // JSON 형식으로 클라이언트에게 응답
  //   res.json(data);
  // }

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
    res.redirect('http://127.0.0.1:5501/frontend/views/QnA.html');
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
    // console.log(updateQnA);
    const data = await this.qnaService.update(updateQnA, id);
    res.send(data);
  }

  @ApiOperation({ summary: 'Delete a specific QnA by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the QnA', type: String })
  @ApiResponse({ status: 200, description: 'QnA deleted.' })
  @ApiResponse({ status: 404, description: 'QnA not found.' })
  @Delete(":id")
  async destory(@Param("id") deleteQnA: DeleteQnADTO) {
    // console.log(deleteQnA);
    return await this.qnaService.destory(deleteQnA);
  }
}