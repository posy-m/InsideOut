import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDTO, DeleteCommentDTO, UpdateCommentDTO } from 'src/dto/comment.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  constructor(private readonly cmtService: CommentService) { }

  @ApiOperation({ summary: 'Get all Comments' })
  @ApiResponse({ status: 200, description: "List of Comments" })
  @ApiResponse({ status: 404, description: "Fail" })
  @HttpCode(200)
  @Get()
  async cmtPage(@Res() res: Response) {
    const data = await this.cmtService.findAll();
    res.send(data);
  }

  @ApiOperation({ summary: 'Get all Comments of qna_id' })
  @ApiResponse({ status: 200, description: "List of Comments" })
  @ApiResponse({ status: 404, description: "Fail" })
  @HttpCode(200)
  @Get("comments")
  async getComments(@Query("index", ParseIntPipe) index: number) {
    const data = await this.cmtService.findIndexAll(index);
    // console.log(data);
    return data;
  }

  @ApiOperation({ summary: 'Create a Comment' })
  @ApiResponse({ status: 201, description: "Comment Created" })
  @ApiResponse({ status: 400, description: "Invalid Input" })
  @ApiBody({
    schema: {
      type: "object",
      properties: { id: { type: "number" }, qna_comment: { type: "string" }, nick_name: { type: "string" }, qna_id: { type: "number" } }
    }
  })
  @HttpCode(201)
  @Post("/create")
  async create(@Body() CreateCmt: CreateCommentDTO, @Res() res: Response) {
    // console.log(CreateCmt.qna_id)
    const data = await this.cmtService.create(CreateCmt);
    res.redirect(`http://127.0.0.1:5501/frontend/views/detail.html?id=${CreateCmt.qna_id}`);
  }

  @ApiOperation({ summary: 'Update a spectific Comment by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the Comment', type: String })
  @ApiResponse({ status: 200, description: 'Comment updated.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  @Put(":id")
  async update(@Body() updateCmt: UpdateCommentDTO, @Param("id") id: number) {
    // console.log(updateCmt);
    const data = await this.cmtService.update(updateCmt, id);
    // console.log(data);
    return data;
  }

  @ApiOperation({ summary: 'Delete a specific Comment by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the Comment', type: String })
  @ApiResponse({ status: 200, description: 'Comment deleted.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  @Delete(":id")
  async destory(@Param("id") deleteCmt: DeleteCommentDTO) {
    // console.log(deleteCmt);
    return await this.cmtService.destroy(deleteCmt);
  }




}
