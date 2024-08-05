import { Controller, Post, UploadedFile, UseInterceptors, Req } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";


@Controller('file')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('upload/single')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    console.log(req.headers)
    console.log(file);
  }
}