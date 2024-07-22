import { Controller, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response, Request } from 'express';
import { WhiskytipService } from './whiskytip.service';
import axios from 'axios';

@Controller('whisky')
export class WhiskytipController {
  constructor(private readonly whiskytipService: WhiskytipService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    console.log(req.headers)
    console.log(file);
    const { data } = req.body
    return data
  }


}

// multer 처리
// @Post('upload')
// @UseInterceptors(FileInterceptor('file', {
//   storage: diskStorage({
//     destination: '/uploads',
//     filename(_, file, callback): void {
//       const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)))
//       return callback(null, `${randomName}${extname(file.originalname)}`)
//     }
//   })
// }))
// uploadFile(@UploadedFile() file: Express.Multer.File) {
//   return {
//     url: `http://localhost:3000/api/uploads/${file.filename}`
//   }
// }

// @Get('uploads/:filename')
// async getImage(
//   @Param('filename') filename: string,
//   @Res() res: Response
// ) {
//   res.sendFile(filename, { root: 'uploads' });
// }