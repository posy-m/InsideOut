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
import { Op } from 'sequelize';

@Injectable()
export class WhiskytipService {
  constructor(
    @InjectModel(whiskyTip) private readonly whiskyTipModel: typeof whiskyTip,
    @InjectModel(whiskyTipComment)
    private readonly whiskyTipCommentModel: typeof whiskyTipComment,
    @InjectModel(whiskyTipCcomment)
    private readonly whiskyTipCcommmentModel: typeof whiskyTipCcomment,
  ) { }

  //CRUD 중에 C
  async creatTip(whiskyTip: whiskyTipDTO): Promise<whiskyTip> {
    try {

      const { nick_name, category, tip_title, tip_content, img } = whiskyTip;
      return this.whiskyTipModel.create({
        nick_name,
        category,
        tip_title,
        tip_content,
        img,
      });
    } catch (error) {
      console.error(error);
    }
  }


  // CRUD R
  // 확인 페이지

  async findId(id: number): Promise<whiskyTip> {
    return await this.whiskyTipModel.findOne({
      where: { id },
      // include: {
      //   model: whiskyTipComment,
      //   // attributes: ['id'],
      // },
    });
  }

  async findIdForUpload(title: string, content: string): Promise<whiskyTip> {
    return await this.whiskyTipModel.findOne({ where: { title, content } });
  }

  //Promise<whiskyTip[]>  : 몯든 whiskyTip  레코드의 배열을 비동기적으로 반환
  // async findAllTips(): Promise<whiskyTip[]> {
  //   //this.whiskyTipModel.findAll() : 데이터 베이스에서 모든 whiskytip 레코드를 찾는 쿼리 수행
  //   return await this.whiskyTipModel.findAll({
  //     order: [['createdAt', 'DESC']], // 생성일시기준으로 내림차순정렬
  //   });
  // }
  // 페이지 네이션 추가
  // async findAllTips(page: number, limit: number): Promise<{ tips: whiskyTip[], totalItems: number, totalPages: number }> {
  //   const offset = (page - 1) * limit;
  //   const { count, rows } = await this.whiskyTipModel.findAndCountAll({
  //     order: [['createdAt', 'DESC']],
  //     offset,
  //     limit,
  //   });

  //   const totalPages = Math.ceil(count / limit);

  //   return {
  //     tips: rows,
  //     totalItems: count,
  //     totalPages,
  //   };
  // }

  //페이지 네이션 + 검색기능
  async findAllTips(query: string, page: number, limit: number, category: number): Promise<{ tips: whiskyTip[], totalItems: number, totalPages: number }> {
    const offset = (page - 1) * limit;
    const { count, rows } = await this.whiskyTipModel.findAndCountAll({
      where: {
        [Op.or]: [
          { tip_title: { [Op.like]: `%${query}%` } },
          { nick_name: { [Op.like]: `%${query}%` } }
        ], [Op.and]: [{ category: { [Op.eq]: category } }]
      },
      order: [['createdAt', 'DESC']],
      offset,
      limit,
    });

    const totalPages = Math.ceil(count / limit);

    return {
      tips: rows,
      totalItems: count,
      totalPages,
    };
  }

  async findAll(): Promise<whiskyTip[]> {
    return await this.whiskyTipModel.findAll();
  }

  // 수정
  async modify(
    id: number,
    tip_title: string,
    tip_content: string,
    img: string,
    category: number
  ): Promise<string> {
    await this.whiskyTipModel.update(
      {
        tip_title,
        tip_content,
        img,
        category
      },
      { where: { id } },
    );
    return '수정완료';
  }

  //삭제
  async maindelete(id: number): Promise<number> {
    return await this.whiskyTipModel.destroy({ where: { id } });
  }

  // 모든 댓글 조회
  async findCommentsByTipId(tip_ID: number): Promise<whiskyTipComment[]> {
    return this.whiskyTipCommentModel.findAll({
      where: { tip_ID },
      order: [['createdAt', 'ASC']],
      include: {
        model: whiskyTipCcomment,
      }
    });
  }

  // async createComment(whiskyComment: whiskyTipCommentDTO): Promise<whiskyTipComment> {
  //   const { nick_name, tip_comment } = whiskyComment
  //   return this.whiskyTipCommentModel.create({
  //     nick_name, tip_comment
  //   })
  // }
  // 댓글 생성
  async createComment(
    whiskyComment: whiskyTipCommentDTO,
  ): Promise<whiskyTipComment> {
    const { nick_name, tip_ID, tip_comment } = whiskyComment;
    return this.whiskyTipCommentModel.create({
      nick_name,
      tip_ID,
      tip_comment,
    });
  }

  // 댓글 수정
  async updateComment(
    id: number,
    tip_ID: number,
    nick_name: string,
    tip_comment: string,
  ): Promise<string> {
    await this.whiskyTipCommentModel.update(
      { tip_comment },
      { where: { id, tip_ID, nick_name } },
    );
    return '댓글 수정 완료';
  }

  // 댓글 수정에서 id값 가져오기
  async findID(tip_ID: number, nick_name: string): Promise<whiskyTipComment> {
    return await this.whiskyTipCommentModel.findOne({
      where: { tip_ID, nick_name },
    });
  }

  // 댓글 삭제
  async deleteComment(id: number, nick_name: string, tip_ID: number) {
    await this.whiskyTipCommentModel.destroy({
      where: { id, nick_name, tip_ID },
    });
  }

  // 대댓글 C
  async createCcomment(
    whiskyCcomment: whiskyTipCcommentDTO,
  ): Promise<whiskyTipCcomment> {
    const { nick_name, tip_com_comment, tip_comment_ID, category } = whiskyCcomment;
    return this.whiskyTipCcommmentModel.create({
      nick_name,
      tip_com_comment,
      tip_comment_ID,
      category

    });
  }

  // 대댓글 조회
  async checkCcomment(category: number): Promise<whiskyTipCcomment[]> {
    return this.whiskyTipCcommmentModel.findAll({
      where: { category },
      order: [['id', 'ASC']]
    })
  }

  // 대댓글 수정
  async updatdCcomment(id: number, tip_com_comment: string): Promise<whiskyTipCcomment> {
    await this.whiskyTipCcommmentModel.update(
      { tip_com_comment },
      { where: { id } }
    );
    return
  }

  // 대댓글 삭제
  async deleteCcomment(id: number) {
    await this.whiskyTipCcommmentModel.destroy({
      where: { id }
    })
  }



  // 검색기능
  async searchTips(query: string): Promise<whiskyTip[]> {
    return await this.whiskyTipModel.findAll({
      where: {
        [Op.or]: [
          { tip_title: { [Op.like]: `%${query}%` } },
          // { tip_content: { [Op.like]: `%${query}%` } }
        ]
      },
      order: [['createdAt', 'DESC']],
    });
  }


  //페이지 네이션 

}

//페이지 네이션

// 해야함

//multer
@Injectable()
export class UploadService implements MulterOptionsFactory {
  dirPath: string;
  constructor() {
    //process.cwd() : 전체 경로를 가져오겠다.
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
