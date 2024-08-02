import { Body, Controller, Get, NotFoundException, Param, Post, Put, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InformationService } from './information.service';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import * as fs from 'fs';
import { CreateContent } from 'src/inside-out-info/dto/information-dto';
import { Insideoutinfo } from './models/inside-out-info.model';
import { UpdateContent } from './dto/information.dio';

// interface DiskStorageOptions {`
//   destination?: string | (( // 1
//       req: Request,
//       file: Express.Multer.File,
//       callback: (error: Error | null, destination: string) => void
//   ) => void) | undefined;
//   filename?( // 2
//       req: Request,
//       file: Express.Multer.File,
//       callback: (error: Error | null, filename: string) => void
//   ): void;
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     if(fs.existsSync('업로드 위치')) {
//       fs.mkdirSync('업로드 위치', { recursive: true });
//     }

//     cb(null, '업로드 될 위치')
//   },
//   filename: function (req, file, cb) {
//      // 파일명 조작 (ex: 임의의 이름 생성 + 확장자)
//     cb(null, '파일명')
//   }
// })








@Controller('information')
export class InformationController {
  constructor(private readonly informationService: InformationService) {}

  // @Get()
  // async infoMain(){
  //   return await this.informationService.findAll();
  // }



  @Get()
  async findAll(): Promise<Insideoutinfo[]> {
      return this.informationService.findAll();
  }

  // @Get(':id')
  // async findOneById(@Param('id') id: number): Promise<Insideoutinfo> {
  //   return this.informationService.findOneById(id);
  // }

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<Insideoutinfo> {
    const result = await this.informationService.findOneById(id);
    if (!result) {
        throw new NotFoundException(`ID가 ${id}인 정보를 찾을 수 없습니다.`);
    }
    return result;
  }




  // @Put(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() updateContent: UpdateContent
  // ): Promise<Insideoutinfo> {
  //   return this.informationService.update(id, updateContent);
  // }

  
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateContent: UpdateContent
  ): Promise<Insideoutinfo> {
    const result = await this.informationService.update(id, updateContent);
    if (!result) {
        throw new NotFoundException(`ID가 ${id}인 정보를 찾을 수 없습니다.`);
    }
    return result;
  }







  // @Post('write')
  // @UseInterceptors(FileInterceptor('file'))
  // async infoCreate(@Res() res : Response, @Req() req : Request, @Body() createContent : CreateContent, @UploadedFile('file') file: Express.Multer.File) {
  //   console.log(req.body)
  //   console.log(file)
  //   const result = await this.informationService.create(createContent, file.path)
  //   return res.redirect('http://127.0.0.1:5500/frontend/HTML/infocreate.html')
  // }


  @Post('write')
  @UseInterceptors(FileInterceptor('file'))
  async infoCreate(@Res() res: Response, @Req() req: Request, @Body() createContent: CreateContent, @UploadedFile() file: Express.Multer.File) {
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


}
