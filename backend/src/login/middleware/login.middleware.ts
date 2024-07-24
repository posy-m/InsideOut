import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger =  new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
      
    res.on('finish', () => {
        this.logger.log(`${res.statusCode}`, req.originalUrl)
    })
    console.log('Request...');
    next();
  }
}
