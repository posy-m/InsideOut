import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Res } from '@nestjs/common';
import { CcommentService } from './ccomment.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateCcommentDTO, DeleteCcommentDTO, UpdateCcommentDTO } from 'src/dto/ccomment.dto';

@Controller('ccomment')
export class CcommentController {
  constructor(private readonly ccmtService: CcommentService) { }

  @ApiOperation({ summary: 'Get all Ccomments' })
  @ApiResponse({ status: 200, description: "List of Ccomments" })
  @ApiResponse({ status: 404, description: "Fail" })
  @HttpCode(200)
  @Get()
  async CcmtPage(@Res() res: Response) {
    const data = await this.ccmtService.findAll();
    res.send(data);
  }

  @ApiOperation({ summary: 'Create a Ccomment' })
  @ApiResponse({ status: 201, description: "Ccomment Created" })
  @ApiResponse({ status: 400, description: "Invalid Input" })
  @ApiBody({
    schema: {
      type: "object",
      properties: { id: { type: "number" }, QnA_comment_ID: { type: "number" }, nick_name: { type: "string" }, QnA_com_comment: { type: "string" } }
    }
  })
  @HttpCode(201)
  @Post("/create")
  async create(@Body() CreateCcmt: CreateCcommentDTO) {
    const data = await this.ccmtService.create(CreateCcmt);
    console.log(data);
    return data;
  }

  @ApiOperation({ summary: 'Get a specific Ccomment by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Ccomment ID' })
  @ApiResponse({ status: 200, description: 'Ccomment found' })
  @ApiResponse({ status: 404, description: 'Ccomment not found' })
  @Get("detail/:id")
  async detail(@Param("id") id: number) {
    return await this.ccmtService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a spectific Ccomment by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the Ccomment', type: String })
  @ApiResponse({ status: 200, description: 'Ccomment updated.' })
  @ApiResponse({ status: 404, description: 'Ccomment not found.' })
  @Put(":id")
  async update(@Body() updateCcmt: UpdateCcommentDTO, @Param("id") id: number) {
    console.log(updateCcmt);
    const data = await this.ccmtService.update(updateCcmt, id);
    console.log(data, id)
    return data;
  }

  @ApiOperation({ summary: 'Delete a specific Ccomment by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the Ccomment', type: String })
  @ApiResponse({ status: 200, description: 'Ccomment deleted.' })
  @ApiResponse({ status: 404, description: 'Ccomment not found.' })
  @Delete(":id")
  async destroy(@Param("id") deleteCcmt: DeleteCcommentDTO) {
    console.log(deleteCcmt);
    return await this.ccmtService.destroy(deleteCcmt);
  }





}
