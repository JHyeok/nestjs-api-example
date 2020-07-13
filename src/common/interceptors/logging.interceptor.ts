import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('[nestjs-api-example] Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(`[nestjs-api-example] After... ${Date.now() - now}ms`),
        ),
      );
  }
}
