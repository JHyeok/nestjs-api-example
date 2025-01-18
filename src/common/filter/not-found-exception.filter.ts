import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import type { IExceptionResponse } from './exception.interface';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const responseBody = exception.getResponse() as IExceptionResponse;

    response.status(status).json({
      statusCode: responseBody.statusCode,
      message: responseBody.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
