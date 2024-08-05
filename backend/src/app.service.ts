import { Injectable } from '@nestjs/common';


@Injectable()
export class WhiskyService {

}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
