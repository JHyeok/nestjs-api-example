import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('')
@ApiTags('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  @ApiOperation({ description: 'health check' })
  healthCheck(@Res() res: Response) {
    const result: string = this.appService.sendOk();

    return res.status(HttpStatus.OK).send(result);
  }
}
