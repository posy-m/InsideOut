import { Module } from '@nestjs/common';
import { InsideOutInfoService } from './inside-out-info.service';
import { InsideOutInfoController } from './inside-out-info.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ signOptions: { expiresIn: '10h' } }), ConfigModule.forRoot()],
  controllers: [InsideOutInfoController],
  providers: [InsideOutInfoService, JwtService],
  exports: [JwtModule, InsideOutInfoService]
})
export class InsideOutInfoModule { }
