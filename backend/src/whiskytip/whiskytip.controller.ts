import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, Res, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response, Request } from 'express';
import { WhiskytipService } from './whiskytip.service';
import axios from 'axios';
import { whiskyTipDTO } from './dto/tip.dto';
import * as path from 'path';
import { whiskyTipCommentDTO } from './dto/tipcomment.dto';
import { whiskyTipComment } from './model/whisky_Tip_Comment.model';

@Controller('whisky')
export class WhiskytipController {
  //whiskytipService : 주입을 받았기 때문에 사용할 수 있다.
  constructor(private readonly whiskytipService: WhiskytipService) { }

  // 인터셉터 : 경로를 가로챈다. 먼저하고 간다.
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        // destination: 'uploads',
        // destination: '/Users/mac/Desktop/uploadFolder', // 파일이 저장될 디렉토리
        destination: 'uploads', // 파일이 저장될 디렉토리
        // filename : 저장할 파일 네임
        // 파일이름이 같으면 덮어씌여지기 때문에 파일네임을 리턴시킨거임
        filename: (_, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //수정함
          return callback(null, `${randomName}${extname(file.originalname)}`);
          // 이걸로 하면 파일네임이 없어서 문자열이 안들어가서 안됨
          // return callback(null, `${randomName}${extname(file.filename)}`);
        },
      }),
    }),
  )
  // 라우터임
  //uploadFile : 경로를 타고 라우터
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response

  ) {
    try {
      // console.log(req.headers);
      // console.log(req.body.title);
      const { title, content, category } = req.body;
      const data: any = {
        nick_name: 'nick_name',
        category: parseInt(category),
        tip_title: title,
        tip_content: content,
      };

      if (!file) {
        //throw new Error('File upload failed');
        data.img = '';
      } else {
        data.img = file.filename;
      }

      // const img = path.join(filename)
      //await this.whiskytipService.creatTip({ nick_name: "nick_name", category: parseInt(category), tip_title: title, tip_content: content, img: filename })
      const result = await this.whiskytipService.creatTip(data);

      console.log(result.dataValues.id);

      //파일 없으면 File upload failed
      // return {
      //   message: 'File uploaded successfully!',
      //   // url: 프론트에 던져주는 거임
      //   // url: `http://localhost:3000/whisky/uploads/${file.filename}`,
      //   url: `http://localhost:3000/whisky/snack`,
      // }
      // return res.send(
      //   `http://127.0.0.1:5500/frontend/html/whiskytip.snack.html`,
      // );
      //res.setHeader("content-type", "text/html");
      //return res.send(`<script>location.href='http://127.0.0.1:5501/frontend/html/whiskytip.snack.html?id=${result.dataValues.id}'</script>`)
      return res.redirect(`http://127.0.0.1:5501/frontend/html/whiskytip.check.html?id=${result.dataValues.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('uploads/:filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    res.sendFile(filename, { root: 'uploads' });
  }

  // snack 페이지
  // @Get('snack')
  // async getAllTips(@Res() res: Response) {
  //   const tips = await this.whiskytipService.findAllTips();
  //   res.json(tips);
  // }

  // 페이지 네이션 추가
  // @Get('snack')
  // async getAllTips(@Res() res: Response, @Query('page') page = 1, @Query('limit') limit = 10) {
  //   const result = await this.whiskytipService.findAllTips(Number(page), Number(limit));
  //   res.json(result);
  // }

  //페이지네이션 + 검색기능
  @Get('snack')
  async getAllTips(@Res() res: Response, @Query('query') query: string, @Query('page') page = 1, @Query('limit') limit = 12, @Query('category') category = 1) {
    const result = await this.whiskytipService.findAllTips(query, Number(page), Number(limit), Number(category));
    res.json(result);
  }


  //확인 페이지
  // js에서가 axios가 아닌 HTML/ form으로 받음
  @Get('check/:id')
  async getcheck(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    res.send(await this.whiskytipService.findId(id));

    console.log((await this.whiskytipService.findId(id)));


    // res.json(tips);
  }

  @Get('getUpload')
  async getUpload(
    @Res() res: Response,
    @Req() req: Request,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const data = await this.whiskytipService.findAll();
    console.log(data.length);
    res.json(data);
  }

  // 수정피에지 받아옴
  @Get('modify/:id')
  async getmodify(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const tips = await this.whiskytipService.findId(id);
    res.json(tips);
  }

  // 수정
  @Put('modify/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads',
        filename: (_, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async putmodify(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body('title') tip_title: string,
    @Body('content') tip_content: string,
    @Body('img') preImg: string,
    @Body('category') category: number,
  ) {
    //console.log("ㅁㅁㅁㅁㅁㅁㅁ", preImg);
    // 수정을 눌렀을때, 이미지 비어도 수정 다음으로 넘어가도록
    let img = preImg ? preImg.replace('http://localhost:3000/', '') : '';

    if (file) {
      img = file.filename;
    }
    const tips = await this.whiskytipService.modify(
      id,
      tip_title,
      tip_content,
      img,
      category
    );
    // console.log(tips);
    res.json(tips);
  }

  //삭제
  @Delete('delete/:id')
  async checkdelete(
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
    @Body('title') tip_title: string,
    @Body('content') tip_content: string,
    @Body('category') category: number,
  ) {
    const tips = await this.whiskytipService.maindelete(id);
    res.json(tips);
    // console.log(tips);
  }

  // 댓글 Post 만드는걸로 쿼리문 사용
  @Post('comment')
  async addComment(@Res() res: Response, @Body('nickname') nicknname: string, @Body('id') id: number, @Body('commentText') comment: string,) {
    // console.log(comment);
    const tips = await this.whiskytipService.createComment({
      nick_name: nicknname,
      tip_ID: id,
      tip_comment: comment,
    });
    res.json(tips);
    // console.log(tips);
  }

  // 하잉
  @Get('fix/:id')
  async fitComment(@Res() res: Response, @Param('id', ParseIntPipe) id: number,) {
    const tips = await this.whiskytipService.findCommentsByTipId(id);
    res.json(tips);
    console.log(tips);
  }

  // 댓글 수정
  @Put('commentupdate/:id')
  async updatecomment(
    @Res() res: Response,
    @Body('nick_name') nick_name: string,
    @Param('id', ParseIntPipe) id: number, // 글 id
    @Body('commentId', ParseIntPipe) comment_id: number, // 커멘트아이디
    @Body('comment') tip_comment: string,
  ) {
    const tips = await this.whiskytipService.updateComment(
      comment_id,
      id,
      nick_name,
      tip_comment,
    );
    res.json(tips);
  }

  // 댓글 삭제
  @Delete('commentDelete/:id')
  async deletecomment(
    @Res() res: Response,
    @Param('id', ParseIntPipe) tip_ID: number, // 글 id
    @Body('nick_name') nick_name: string, // 닉네임
    @Body('comment_id', ParseIntPipe) comment_id: number, // 글 id
  ) {
    const tips = await this.whiskytipService.deleteComment(
      comment_id,
      nick_name,
      tip_ID,
    );
    console.log(tips);
    res.json(tips);
  }

  // 대댓글 post
  @Post('Ccomment')
  async addCcomment(@Res() res: Response,
    @Body("tip_comment_Id") tip_comment_ID: number,
    @Body('Ccomment') Ccomment: string,
    @Body('nickname') nickname: string,
    // @Body('id') id: number,
    @Body('category') category: number) {
    const tips = await this.whiskytipService.createCcomment({
      nick_name: nickname,
      tip_com_comment: Ccomment,
      tip_comment_ID,
      category
    })
    console.log(tips);

    res.json(tips)
  }

  // 대댓글 get
  @Get('Ccomments/:id')
  async checkCcomment(@Res() res: Response, @Param('id', ParseIntPipe) category: number) {
    const tips = await this.whiskytipService.checkCcomment(category);
    // console.log(tips);
    res.json(tips)

  }

  //대댓글 수정
  @Put('Ccommentupdate/:id')
  async updateCcomment(@Res() res: Response,
    @Param('id', ParseIntPipe) id: number, // 글 id
    @Body('comment') tip_com_comment: string,) {
    const tips = await this.whiskytipService.updatdCcomment(id, tip_com_comment)
    res.json(tips);
  }

  //대댓글 삭제
  @Delete('CcommentDelete/:id')
  async deleteCcomment(@Res() res: Response, @Param('id', ParseIntPipe) id: number, // 글 id
  ) {
    const tips = await this.whiskytipService.deleteCcomment(id)
    res.json(tips)
  }




  //검색기능
  @Get('search')
  async searchTips(@Query('query') query: string, @Res() res: Response) {
    try {
      const tips = await this.whiskytipService.searchTips(query);
      res.json(tips);
    } catch (error) {
      console.error('Error searching tips', error);
      res.status(500).send('Error searching tips');
    }
  }
}