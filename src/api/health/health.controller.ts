import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { HealthService } from 'src/api/health/health.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
