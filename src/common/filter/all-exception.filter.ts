import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import type { IExceptionResponse } from './exception.interface';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const responseBody = exception.getResponse() as IExceptionResponse;
      const status = exception.getStatus();

      response.status(status).json({
        statusCode: responseBody.statusCode,
        message: responseBody.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '알 수 없는 에러가 발생했습니다.',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
