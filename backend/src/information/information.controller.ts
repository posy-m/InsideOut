import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InformationService } from './information.service';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import * as fs from 'fs';
import { CreateContent } from 'src/inside-out-info/dto/information-dto';
import { Insideoutinfo } from './models/inside-out-info.model';
import { UpdateContent } from './dto/information.dio';


@Controller('information')
export class InformationController {
  constructor(private readonly informationService: InformationService) {}

  @Get() // 메인페이지
  async findAll(): Promise<Insideoutinfo[]> {
      return this.informationService.findAll();
  }

  @Get(':id') // 상세페이지
  async findOneById(@Param('id') id: number): Promise<Insideoutinfo> {
    const result = await this.informationService.findOneById(id);
    if (!result) {
        throw new NotFoundException(`ID가 ${id}인 정보를 찾을 수 없습니다.`);
    }
    return result;
  }

  @Get('update/:id') // 업데이트 (수정 페이지 들어왔을때 값 넣어주기)
  async updateFindId(@Param('id') id : number, @Res() res : Response) {
    try {
      const result = await this.informationService.findOneById(id);
      res.json(result);
    } catch (error) {
      throw new NotFoundException(`ID가 ${id}인 정보를 찾을 수 없습니다.`);
    }
  }

  @Put('update/:id') // 업데이트 (수정 후 Put)
  async update(
    @Param('id') id: number,
    @Body() updateContent: UpdateContent
  ): Promise<Insideoutinfo> {
    console.log(updateContent)
    const result = await this.informationService.update(id, updateContent);
    if (!result) {
        throw new NotFoundException(`ID가 ${id}인 정보를 찾을 수 없습니다.`);
    }
    return result;
  }


  @Post('write') // 글 작성
  @UseInterceptors(FileInterceptor('file'))
  async infoCreate(@Res() res: Response, @Req() req: Request, @Body() createContent : UpdateContent, @UploadedFile() file: Express.Multer.File) {

      if (!file) {
          return res.status(400).json({ message: '파일이 필요합니다.' });
      }
      try {
        const result = await this.informationService.create(createContent, file.path);
        return res.status(201).json({ message: '리소스가 성공적으로 생성되었습니다.', data: result });
    } catch (error) {
        return res.status(500).json({ message: '리소스 생성 중 오류 발생', error });
    }
  }


  @Delete('delete/:id')
  async delete(@Param('id') id : number, @Res() res:Response){
    try {
      await this.informationService.delete(id);
      res.send('삭제완료')
    } catch (error) {
      throw new Error("유저가 다릅니다.");
    }
  }
}
