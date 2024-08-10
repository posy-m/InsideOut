import { Module } from '@nestjs/common';
import { UploadService, WhiskytipService } from './whiskytip.service';
import { WhiskytipController } from './whiskytip.controller';

import { SequelizeModule } from '@nestjs/sequelize';
import { whiskyTip } from 'src/whiskytip/model/whisky_Tip.model';
import { whiskyTipComment } from 'src/whiskytip/model/whisky_Tip_Comment.model';
import { whiskyTipCcomment } from 'src/whiskytip/model/whisky_Tip_Ccomment.model';
import { MulterModule } from '@nestjs/platform-express';
import { InsideOutInfoModule } from 'src/inside-out-info/inside-out-info.module';
import { InsideOutInfoService } from 'src/inside-out-info/inside-out-info.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([whiskyTip, whiskyTipComment, whiskyTipCcomment]),
  MulterModule.registerAsync({ useClass: UploadService }),
    InsideOutInfoModule,
  MulterModule.registerAsync({
    useClass: UploadService
  })],
  controllers: [WhiskytipController],
  //providers : 주입할 애들을 둘고온다.
  providers: [WhiskytipService, InsideOutInfoService, JwtModule],
})
export class WhiskytipModule { }
