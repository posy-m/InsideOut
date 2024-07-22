import { Injectable } from '@nestjs/common';


@Injectable()
export class WhiskyService {

}

@Injectable()
export class AppService {
  getHello(): string {
    return '평화, 사랑, 희망, 존중';
  }
}
