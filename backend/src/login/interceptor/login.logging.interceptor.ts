import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;

    this.logger.log(`Incoming request: ${method} ${url}`);

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => this.logger.log(`Response for: ${method} ${url} - ${Date.now() - now}ms`))
      );
  }
}
