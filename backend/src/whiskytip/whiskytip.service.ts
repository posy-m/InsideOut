import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
//DTO
import { whiskyTipDTO } from './dto/tip.dto';
import { whiskyTipCommentDTO } from './dto/tipcomment.dto';
import { whiskyTipCcommentDTO } from './dto/tipCcomment.dto';
// model 
import { whiskyTip } from './model/whisky_Tip.model';
import { whiskyTipComment } from './model/whisky_Tip_Comment.model';
import { whiskyTipCcomment } from './model/whisky_Tip_Ccomment.model';
import { RequestHandler } from '@nestjs/common/interfaces';
import * as multer from 'multer';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class WhiskytipService {
  constructor(@InjectModel(whiskyTip) private readonly whiskyTipModel: typeof whiskyTip,
    @InjectModel(whiskyTipComment) private readonly whiskyTipCommentModel: typeof whiskyTipComment,
    @InjectModel(whiskyTipCcomment) private readonly whiskyTipCcommmentModel: typeof whiskyTipCcomment
  ) { }

  //CRUD 중에 C
  creatTip(whiskyTip: whiskyTipDTO): Promise<whiskyTip> {
    const { nick_name, tip_title, tip_content, img } = whiskyTip
    return this.whiskyTipModel.create({
      nick_name, tip_title, tip_content, img
    })
  }

  createComment(whiskyComment: whiskyTipCommentDTO): Promise<whiskyTipComment> {
    const { nick_name, tip_comment } = whiskyComment
    return this.whiskyTipCommentModel.create({
      nick_name, tip_comment
    })
  }

  createCcomment(whiskyCcomment: whiskyTipCcommentDTO): Promise<whiskyTipCcomment> {
    const { nick_name, tip_com_comment } = whiskyCcomment;
    return this.whiskyTipCcommmentModel.create({
      nick_name, tip_com_comment
    })
  }

  // CRUD R



}

//multer
@Injectable()
export class UploadService implements MulterOptionsFactory {
  dirPath: string;
  constructor() {
    this.dirPath = path.join(process.cwd(), 'uploads');
    // this.dirPath = path.join(__dirname, 'uploads');
    this.mkdir();
    this.createMulterOptions();
  }

  mkdir() {
    try {
      fs.readdirSync(this.dirPath);
    } catch (err) {
      fs.mkdirSync(this.dirPath);
    }
  }

  createMulterOptions() {
    const dirPath = this.dirPath;
    const option = {
      storage: multer.diskStorage({
        destination(req, file, done) {
          done(null, dirPath);
        },

        filename(req, file, done) {
          const ext = path.extname(file.originalname);
          const name = path.basename(file.originalname, ext);
          done(null, `${name}_${Date.now()}${ext}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
    };
    return option;
  }
}

// async login() {
//   this.whisky
// }