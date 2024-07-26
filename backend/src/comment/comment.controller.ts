import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Res } from '@nestjs/common';
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

  @ApiOperation({ summary: 'Create a Comment' })
  @ApiResponse({ status: 201, description: "Comment Created" })
  @ApiResponse({ status: 400, description: "Invalid Input" })
  @ApiBody({
    schema: {
      type: "object",
      properties: { id: { type: "number" }, QnA_ID: { type: "number" }, nick_name: { type: "string" }, QnA_comment: { type: "string" } }
    }
  })
  @HttpCode(201)
  @Post("/create")
  async create(@Body() CreateCmt: CreateCommentDTO) {
    const data = await this.cmtService.create(CreateCmt);
    console.log(data);
    return data;
  }

  @ApiOperation({ summary: 'Get a specific Comment by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Comment ID' })
  @ApiResponse({ status: 200, description: 'Comment found' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @Get("detail/:id")
  async detail(@Param("id") id: number) {
    return await this.cmtService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a spectific Comment by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the Comment', type: String })
  @ApiResponse({ status: 200, description: 'Comment updated.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  @Put(":id")
  async update(@Body() updateCmt: UpdateCommentDTO, @Param("id") id: number) {
    console.log(updateCmt);
    const data = await this.cmtService.update(updateCmt, id);
    console.log(data);
    return data;
  }

  @ApiOperation({ summary: 'Delete a specific Comment by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the Comment', type: String })
  @ApiResponse({ status: 200, description: 'Comment deleted.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  @Delete(":id")
  async destory(@Param("id") deleteCmt: DeleteCommentDTO) {
    console.log(deleteCmt);
    return await this.cmtService.destroy(deleteCmt);
  }




}
