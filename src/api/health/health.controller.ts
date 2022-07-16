import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';

@Controller('')
@ApiTags('')
export class HealthController {
  constructor(private readonly appService: HealthService) {}

  @Get('/health')
  @ApiOperation({ description: 'health check' })
  healthCheck(@Res() res: Response) {
    const result: string = this.appService.sendOk();

    return res.status(HttpStatus.OK).send(result);
  }
}
