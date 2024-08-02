import { Module } from '@nestjs/common';
import { InsideOutInfoService } from './inside-out-info.service';
import { InsideOutInfoController } from './inside-out-info.controller';
import {ConfigModule} from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
    global: true,
    secret: process.env.JWT_KEY,
    signOptions: { expiresIn: '60m' },
  })],
  controllers: [InsideOutInfoController],
  providers: [InsideOutInfoService],
})
export class InsideOutInfoModule {}
