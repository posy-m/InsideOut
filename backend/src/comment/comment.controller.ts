import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDTO, DeleteCommentDTO, UpdateCommentDTO } from 'src/dto/comment.dto';
import { Response } from 'express';

@Controller('comment')
export class CommentController {
  constructor(private readonly cmtService: CommentService) { }

  // 댓글 전체 조회
  @Get()
  async cmtPage(@Res() res: Response) {
    const data = await this.cmtService.findAll();
    res.send(data);
  }

  // 해당 글에 대한 댓글 조회
  @Get("comments")
  async getComments(@Query("index", ParseIntPipe) index: number) {
    const data = await this.cmtService.findIndexAll(index);
    // console.log(data);
    return data;
  }

  // 댓글 작성
  @Post("/create")
  async create(@Body() CreateCmt: CreateCommentDTO, @Res() res: Response) {
    // console.log(CreateCmt.qna_id)
    await this.cmtService.create(CreateCmt);
    res.redirect(`http://127.0.0.1:5501/frontend/views/detail.html?id=${CreateCmt.qna_id}`);
  }

  // 댓글 수정
  @Put(":id")
  async update(@Body() updateCmt: UpdateCommentDTO, @Param("id") id: number) {
    // console.log(updateCmt);
    const data = await this.cmtService.update(updateCmt, id);
    // console.log(data);
    return data;
  }

  // 댓글 삭제
  @Delete(":id")
  async destory(@Param("id") deleteCmt: DeleteCommentDTO) {
    // console.log(deleteCmt);
    return await this.cmtService.destroy(deleteCmt);
  }
}
