import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common';
import { CcommentService } from './ccomment.service';
import { Response } from 'express';
import { CreateCcommentDTO, DeleteCcommentDTO, UpdateCcommentDTO } from 'src/dto/ccomment.dto';

@Controller('ccomment')
export class CcommentController {
  constructor(private readonly ccmtService: CcommentService) { }

  // 대댓글 전체 조회
  @Get()
  async CcmtPage(@Res() res: Response) {
    const data = await this.ccmtService.findAll();
    res.send(data);
  }

  // 해당 댓글에 대한 대댓글 조회
  @Get("ccomments")
  // ParseIntPipe : 쿼리스트링으로 받는 id, index 값이 문자형이면 숫자형으로 변환
  async getComments(@Query("index", ParseIntPipe) index: number) {
    const data = await this.ccmtService.findIndexAll(index);
    console.log(data);
    return data;
  }


  // 대댓글 작성
  @Post("/create")
  async create(@Body() CreateCcmt: CreateCcommentDTO, @Res() res: Response, @Query("id") index: number) {
    console.log(CreateCcmt);
    const data = await this.ccmtService.create(CreateCcmt);
    console.log(data);
    return res.redirect(`http://127.0.0.1:5501/frontend/views/detail.html?id=${index}`);
  }

  // 대댓글 상세 조회
  @Get("detail/:id")
  async detail(@Param("id") id: number) {
    return await this.ccmtService.findOne(id);
  }

  // 대댓글 수정
  @Put(":id")
  async update(@Body() updateCcmt: UpdateCcommentDTO, @Param("id") id: number) {
    console.log(updateCcmt);
    const data = await this.ccmtService.update(updateCcmt, id);
    console.log(data, id)
    return data;
  }

  // 대댓글 삭제
  @Delete(":id")
  async destroy(@Param("id") deleteCcmt: DeleteCcommentDTO) {
    console.log(deleteCcmt);
    return await this.ccmtService.destroy(deleteCcmt);
  }
}
